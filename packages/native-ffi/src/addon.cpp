#include <napi.h>
#include <string>
#include <stdexcept>

#if defined(_WIN32)
  #include <windows.h>
  typedef HMODULE LibHandle;
  #define LOAD_LIB(name) LoadLibraryA(name)
  #define LOAD_FN(lib, fn) GetProcAddress(lib, fn)
  #define CLOSE_LIB(lib) FreeLibrary(lib)
  const char* SHARED_LIB_PATH = "./libs/test-gcc/mylib.dll";
#else
  #include <dlfcn.h>
  typedef void* LibHandle;
  #define LOAD_LIB(name) dlopen(name, RTLD_NOW)
  #define LOAD_FN(lib, fn) dlsym(lib, fn)
  #define CLOSE_LIB(lib) dlclose(lib)
  #if defined(__APPLE__)
    const char* SHARED_LIB_PATH = "./libs/test-gcc/libmylib.dylib";
  #else
    const char* SHARED_LIB_PATH = "./libs/test-gcc/libmylib.so";
  #endif
#endif

typedef const char* (*GetDateTimeFunc)();
typedef char* (*GetInputParamFunc)(int, int*);
typedef int (*CalculateAreaFunc)(int, int);

LibHandle cachedLib = nullptr;
GetDateTimeFunc get_current_datetime = nullptr;
GetInputParamFunc get_input_param = nullptr;

void LoadCachedFunctions() {
  if (cachedLib != nullptr) return;

  cachedLib = LOAD_LIB(SHARED_LIB_PATH);
  if (!cachedLib) {
#if defined(_WIN32)
    throw std::runtime_error("Failed to load DLL");
#else
    throw std::runtime_error(dlerror());
#endif
  }

  get_current_datetime = (GetDateTimeFunc)LOAD_FN(cachedLib, "get_current_datetime");
  get_input_param = (GetInputParamFunc)LOAD_FN(cachedLib, "get_input_param");

  if (!get_current_datetime || !get_input_param) {
    CLOSE_LIB(cachedLib);
    cachedLib = nullptr;
    throw std::runtime_error("Failed to load get_current_datetime or get_input_param");
  }
}

Napi::String GetCurrentDatetime(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  try {
    LoadCachedFunctions();
    const char* result = get_current_datetime();
    return Napi::String::New(env, result);
  } catch (const std::exception& ex) {
    Napi::Error::New(env, ex.what()).ThrowAsJavaScriptException();
    return Napi::String::New(env, "");
  }
}

Napi::String GetInputParam(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Expected one number argument").ThrowAsJavaScriptException();
    return Napi::String::New(env, "");
  }

  try {
    LoadCachedFunctions();
    int input = info[0].As<Napi::Number>().Int32Value();
    int output_len = 0;
    const char* result = get_input_param(input, &output_len);
    return Napi::String::New(env, result);
  } catch (const std::exception& ex) {
    Napi::Error::New(env, ex.what()).ThrowAsJavaScriptException();
    return Napi::String::New(env, "");
  }
}

Napi::Value CalculateArea(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::TypeError::New(env, "Expected two number arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  int width = info[0].As<Napi::Number>().Int32Value();
  int height = info[1].As<Napi::Number>().Int32Value();

  LibHandle tempLib = LOAD_LIB(SHARED_LIB_PATH);
  if (!tempLib) {
#if defined(_WIN32)
    Napi::Error::New(env, "Failed to load mylib.dll").ThrowAsJavaScriptException();
#else
    std::string err = dlerror();
    Napi::Error::New(env, "Failed to load shared lib: " + err).ThrowAsJavaScriptException();
#endif
    return env.Null();
  }

  CalculateAreaFunc func = (CalculateAreaFunc)LOAD_FN(tempLib, "calculate_area");
  if (!func) {
    CLOSE_LIB(tempLib);
    Napi::Error::New(env, "Failed to load calculate_area").ThrowAsJavaScriptException();
    return env.Null();
  }

  int result = func(width, height);
  CLOSE_LIB(tempLib);
  return Napi::Number::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("getCurrentDatetime", Napi::Function::New(env, GetCurrentDatetime));
  exports.Set("getInputParam", Napi::Function::New(env, GetInputParam));
  exports.Set("calculateArea", Napi::Function::New(env, CalculateArea));
  return exports;
}

NODE_API_MODULE(nativeffi, Init)
