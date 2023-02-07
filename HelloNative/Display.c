# include "fr_imtld_ilog_Display.h"
# include <stdio.h>
# include <jni.h>

void Java_fr_imtld_ilog_Display_display(JNIEnv *env, jobject this, jstring jstrMessage, jsize jintLine) {
	const char *msg = (*env)->GetStringUTFChars(env, jstrMessage, 0);
	printf("%d: %s\n", jintLine, msg);
	(*env)->ReleaseStringUTFChars(env, jstrMessage, msg);
}
