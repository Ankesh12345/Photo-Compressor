 const uploadbox=document.querySelector(".upload-box"),
 fileInput=uploadbox.querySelector("input");
 previewImg=uploadbox.querySelector("img");
 WidthInput=document.querySelector(".width input");
 HeightInput=document.querySelector(".height input");
 ratioInput=document.querySelector(".ratio input");
 qualityInput=document.querySelector(".quality input");
 downloadBtn=document.querySelector(".download-btn");
 let ogImgRatio;
 const loadfile=(e)=>
 {
    const file =e.target.files[0];
    if(!file) return;
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>
    {
        WidthInput.value=previewImg.naturalWidth;
        HeightInput.value=previewImg.naturalHeight;
        ogImgRatio=previewImg.naturalWidth/previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    })
    console.log("got it")
 }

 WidthInput.addEventListener("keyup",()=>
 {
    const height=ratioInput.checked?WidthInput.value/ogImgRatio:HeightInput.value;
    HeightInput.value=Math.floor(height);
 })

 HeightInput.addEventListener("keyup",()=>
 {
    const width=ratioInput.checked?HeightInput.value/ogImgRatio:WidthInput.value;
    WidthInput.value=Math.floor(width);
 })
const resizeAnddownload=()=>
{
    const canvas=document.createElement("canvas");
    const a=document.createElement("a");
    const ctx=canvas.getContext("2d");
    const imgQuality=qualityInput.checked?0.7:1.0;

    canvas.width=WidthInput.value;
    canvas.height=HeightInput.value;

    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);
a.href=canvas.toDataURL("image/jpg",imgQuality);
a.download=new Date().getTime();
a.click();
}
 downloadBtn.addEventListener("click",resizeAnddownload);
 fileInput.addEventListener("change",loadfile);
 uploadbox.addEventListener("click",()=>fileInput.click());