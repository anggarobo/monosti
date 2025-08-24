#include <dlfcn.h>
#include <stdio.h>

typedef const char* (*GetDateTimeFunc)();
typedef char* (*GetInputParam)(int value, int *output_len);

int main() {
    void* lib = dlopen("./mylib.so", RTLD_LAZY);
    if (!lib) {
        printf("Failed to load shared library: %s\n", dlerror());
        return 1;
    }

    GetDateTimeFunc getDateTime = (GetDateTimeFunc)dlsym(lib, "get_current_datetime");
    GetInputParam getInputParam = (GetInputParam)dlsym(lib, "get_input_param");

    if (getDateTime) {
        const char* datetime = getDateTime();
        printf("Current datetime: %s\n", datetime);
    } else {
        printf("Failed to load get_current_datetime function: %s\n", dlerror());
    }

    if (getInputParam){
        int output_len = 0;
        const char* result = getInputParam(99999999, &output_len);

        printf("output_len: %d, result: %s\n", output_len, result);
    } else {
        printf("Failed to load get_input_param function: %s\n", dlerror());
    }

    dlclose(lib);
    return 0;
}
