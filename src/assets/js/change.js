function getBingImages(imgUrls) {
	var indexName = "bing-image-index";
	var index = sessionStorage.getItem(indexName);
	var panel = document.body;
	if (isNaN(index) || index == 7) index = 0;
	else index++;
	var imgUrl = imgUrls[index];
	var url = "https://www.cn.bing.com" + imgUrl;
	panel.style.background = "url('" + url + "') center center no-repeat #666";
	panel.style.backgroundSize = "cover";
	sessionStorage.setItem(indexName, index);
}

fetch("https://raw.githack.com/maifuwa/portal/main/src/assets/json/images.json")
	.then(response => response.json())
	.then(data => getBingImages(data))
	.catch(e => {
		console.log("获取图片失败, 正在尝试使用本地图片");
		fetch("/src/assets/json/images.json").then(res => res.json()).then(data => {
			getBingImages(data);
			console.log("使用本地图片成功");
		}).catch(e => console.error("使用本地图片失败", e));
	});