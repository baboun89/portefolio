let point = document.querySelector(".point")

point.addEventListener("click",del)
function del() {
     sessionStorage.setItem('click', 1)
     point.removeEventListener("click",del)
}