@ECHO OFF
setlocal
set WRAPPER_JAR="%~dp0.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%~dp0.mvn\wrapper\maven-wrapper.properties"
if not exist %WRAPPER_JAR% (
  powershell -Command "Invoke-WebRequest -Uri (Get-Content %WRAPPER_PROPERTIES% | Select-String 'wrapperUrl=' | ForEach-Object { $_.Line.Split('=')[1] }) -OutFile %WRAPPER_JAR%"
)
set MAVEN_OPTS=%MAVEN_OPTS% -Xmx512m
java %MAVEN_OPTS% -cp %WRAPPER_JAR% org.apache.maven.wrapper.MavenWrapperMain %*
endlocal

