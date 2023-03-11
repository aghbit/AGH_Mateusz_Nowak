const photoTemplate = document.getElementById('photo-input-template')
const btn = document.getElementById('btn-photo')
const photoContainer = document.getElementById('photo-input-containter')

for(let input of photoContainer.children){
    const photo = input.getElementById('photo')
    const thumbnail = input.getElementById('thumbnail')
    photo.addEventListener('change', e=>{
        thumbnail.value = photo.value
    })
}

btn.addEventListener('click', ()=>{
    const clone = photoTemplate.content.cloneNode(true)
    const photo = clone.getElementById('photo')
    const thumbnail = clone.getElementById('thumbnail')
    photo.addEventListener('change', e=>{
        console.log(photo.value)
        thumbnail.value = photo.value
    })
    photoContainer.appendChild(clone)
})

function remove(el){
    while (!el.classList.contains('form-row')){
        el = el.parentElement
    }
    el.remove()
}