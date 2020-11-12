const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    // logo: "./images/acfun.jpg",
    logo:"a",
    logoType: "image",
    url: "https://www.acfun.cn",
  },
  {
    // logo: "./images/bilibili.png",
    logo:"b",
    logoType: "image",
    url: "https://www.bilibili.com",
  },
];

const simplifyUrl=(url)=>{
  return url.replace('https://','')
  .replace('http://','')
  .replace('www.','')
  .replace(/\/.*/,'')//删除 / 开头的内容
}

const render = () => {
  $siteList.find("li:not(.last)").remove(); //清掉last以外的
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo[0]}
          </div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
          <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
          </div>
        </div>
      </li>`).insertBefore($lastLi);
      $li.on('click',()=>{
        window.open(node.url)//绕过a标签
      })
      $li.on('click','.close',(e)=>{
        e.stopPropagation()//阻止冒泡
        console.log(hashMap)
        hashMap.splice(index,1)
        render()
      })
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    // alert("请输入http开头的网址");
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  //console.log("页面要关闭了"); F12设置 Perserve log
  const string = JSON.stringify(hashMap); //转换成字符串
  localStorage.setItem("x", string); //在本地存储一个key value
};


$(document).on('keypress',(e)=>{
  // const key =e.key
  const {key}=e
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
    }
  }

})