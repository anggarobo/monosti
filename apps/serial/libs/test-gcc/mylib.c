
#include <stdio.h>
#include <time.h>
#include <string.h>

__attribute__((visibility("default"))) const char * get_current_datetime(){
    static char buffer[15]; // hhmmssDDMMYYYY + null terminator = 14 + 1
    time_t now = time(NULL);
    struct tm* tm_info = localtime(&now);

    if (tm_info) {
        snprintf(buffer, sizeof(buffer), "%02d%02d%02d%02d%02d%04d",
                 tm_info->tm_hour,
                 tm_info->tm_min,
                 tm_info->tm_sec,
                 tm_info->tm_mday,
                 tm_info->tm_mon + 1,
                 tm_info->tm_year + 1900);
    } else {
        strncpy(buffer, "00000000000000", sizeof(buffer));
    }

    return buffer;
}

__attribute__((visibility("default"))) char * get_input_param(int value, int *output_len){

    static char buffer[255] = {0};

    int len = sprintf(buffer, "input received = %d", value);
    *output_len = len;
    return buffer;
}