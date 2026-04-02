1. Compatibility Renderer
2. Project Settings -> XR -> enable
3. Project Settings -> XR -> Shaders enable

## Szene
```
Main
– XROrigin3D
–– XRCamera3D
```

## OS X Spezifika

Anscheinend keine Live-Preview möglich. Deploy scheint aber zu gehen. 

#### Exporting for Android:
https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html#doc-exporting-for-android
Benötigt: 
- [OpenJDK 17](https://adoptium.net/temurin/releases/?variant=openjdk17&version=17&os=any&arch=any)
- [Android SDK](https://developer.android.com/studio/) mit folgenden Packages: 
	- Android SDK Platform-Tools version 35.0.0 or later
	- Android SDK Build-Tools version 35.0.1
	- Android SDK Platform 35
	- Android SDK Command-line Tools (latest)


> [!info] Godot Doku ist hier etwas schwammig formuliert
> Die Packages lassen sich bei den Reitern installieren. Vorsicht: Checkbox bei `Show package details` muss gesetzt sein. Nur dann lässt sich bei den Build Tools die Version 35.0.1 installieren.  

![[Android-Studio_packages_1.jpg]]


https://docs.godotengine.org/en/stable/tutorials/xr/deploying_to_android.html

### Troubleshooting
OpenJDK version herausfinden
```
java --version
```

Angeschlossene Android Devices auflisten
```
adb devices
```
