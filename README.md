# hblive

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 微信小程序单位换算
1rpx = 0.5px

12pt   16px
11pt   15px
10.5pt 14px
10pt   13px

0.8em
https://www.cnblogs.com/lbnnbs/p/7518934.html

/images ->  require('@/assets/images/expo/zhibo.png')



## 连接 
@click="$router.push({ path: `/expo/company/${item.id}`})"

watch: {
$route() {
    this.meetingId = this.$route.params.id;
}
}

this.companyId = this.$route.params.id;
