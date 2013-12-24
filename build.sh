if ! [ -f compiler.jar ];then
   if which wget > /dev/null && which unzip > /dev/null;then
      echo "Getting closure compiler"
      wget http://dl.google.com/closure-compiler/compiler-latest.zip
      mkdir tmp
      unzip compiler-latest.zip -d tmp
      mv tmp/compiler.jar compiler.jar
      rm -rf tmp
      rm compiler-latest.zip
   else
    echo "download http://dl.google.com/closure-compiler/compiler-latest.zip and unzip compiler.jar"
   fi
fi
if which java > /dev/null; then
   if [ -f compiler.jar ];then
      echo "Compliling javascript ..."
      java -jar compiler.jar --js src/* --js_output_file platformer.min.js
   fi
else
   echo "Please install java"
fi
