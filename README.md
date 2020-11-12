# 开发

```
yarn global add parcel-bundler
parcel src/index.html
```

# build 脚本

```
yarn init -y

//package.json
"scripts":{
    "build":"rm -rf dist && parcel build src/index.html --no-minify --public-url ./"
  },

yarn build
```
