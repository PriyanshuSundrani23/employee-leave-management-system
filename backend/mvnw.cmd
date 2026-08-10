@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.2.0
@REM ----------------------------------------------------------------------------

@if "%MAVEN_BATCH_ECHO%" == "on"  echo %MAVEN_BATCH_ECHO%
@if "%JAVA_HOME%" == "" echo WARNING: JAVA_HOME not set, will use java from PATH

@setlocal

set ERROR_CODE=0

@set MAVEN_PROJECTBASEDIR=%~dp0
@if "%MAVEN_PROJECTBASEDIR:~-1%"=="\" set MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

@set WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
@set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@REM Extension to allow call of arbitrary predefined scripts
if exist "%MAVEN_PROJECTBASEDIR%\.mvn\timing" echo %date% %time% > "%MAVEN_PROJECTBASEDIR%\.mvn\timing"

@REM Downloading maven-wrapper.jar if not present
if exist %WRAPPER_JAR% goto run
if not exist "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper" mkdir "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper"

@set WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

echo Downloading %WRAPPER_URL%
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile(%WRAPPER_URL%, %WRAPPER_JAR%)"
if %ERRORLEVEL% NEQ 0 goto error

:run
@set MAVEN_CMD_LINE_ARGS=%*

if exist "%MAVEN_PROJECTBASEDIR%\.mvn\jvm.config" (
    for /F "usebackq delims=" %%a in ("%MAVEN_PROJECTBASEDIR%\.mvn\jvm.config") do set JVM_CONFIG_MAVEN_PROPERTIES=%%a
)

java %JVM_CONFIG_MAVEN_PROPERTIES% -classpath %WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" %WRAPPER_LAUNCHER% %MAVEN_CMD_LINE_ARGS%
if %ERRORLEVEL% NEQ 0 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
cmd /C exit /B %ERROR_CODE%
