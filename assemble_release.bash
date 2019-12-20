react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
rm -r app/src/main/res/drawable-hdpi
rm -r app/src/main/res/drawable-mdpi
rm -r app/src/main/res/drawable-xhdpi
rm -r app/src/main/res/drawable-xxhdpi
rm -r app/src/main/res/drawable-xxxhdpi
rm -r app/src/main/res/raw
./gradlew assembleRelease
