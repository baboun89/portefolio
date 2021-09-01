new FlipBook('flipBook', {
    canClose: true,
})
let label = document.querySelector("label")
let boutton = sessionStorage.getItem('click')
if (boutton == 1) {
    label.style.opacity = "1";
} else {
    label.style.opacity = "0";
}