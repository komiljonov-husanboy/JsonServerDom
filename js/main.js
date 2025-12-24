let elList = document.querySelector(".List")
let elForm = document.querySelector(".order-form")
let elModalWrpp = document.querySelector(".modal-wrp")
let elModalInn = document.querySelector(".modal-inn")

//Modal code start
function AutoShowModal(active) {
    if (active) {
        elModalWrpp.classList.remove("hidden")
        elModalWrpp.classList.remove("scale-[0]")
        elModalWrpp.classList.add("scale-[1]")
    }else{
          elModalWrpp.classList.add("scale-[0]")
        elModalWrpp.classList.remove("scale-[1]")
    }
}
elModalWrpp.addEventListener("click" , (evt)=> evt.target.id == "Wrapper" && AutoShowModal(false))
//Modal code end

elForm.addEventListener("submit", (evt)=>{
    evt.preventDefault()
     const Data = {
        product: evt.target.message.value
     }
     axios.post("http://localhost:3000/todos" , Data).then(()=>{
         getApi()
         evt.target.reset()
     })
})
// Creat part
function ListRender(arr, list) {
    list.innerHTML = null,
        arr.forEach(item => {
            let elItem = document.createElement("li")
            elItem.className = "flex justify-between  p-2 rounded-md border-[1px]"
            elItem.innerHTML = `
                    <span class="">${item.product}</span>
                    <div>
                        <button onclick="updateBtn('${item.id}')" class=" items-end border-[1px] w-[30px] p-1 border-none text-white rounded-md bg-blue-400">E</button>
                        <button onclick="deleteBtn('${item.id}')" class=" items-end border-[1px] w-[30px] p-1 border-none text-white rounded-md bg-red-400">D</button>
                    </div>
                `
            list.appendChild(elItem)
        });
}
function getApi() {
    axios
        .get("http://localhost:3000/todos").then((res) => ListRender(res.data, elList));
}
getApi()

function deleteBtn(id) {
    AutoShowModal(true)
    elModalInn.classList.remove("h-[300px]")
    elModalInn.classList.add("h-[180px]")
    elModalInn.innerHTML = `
    <h1 class="text-center text-[25px] text-red-500 font-bold">Are you Delete ?</h1>
     <div class=" flex justify-center gap-[10px] pt-[40px]">
     <button  onclick="AutoShowModal(false)" class=" p-3 w-[45%] bg-gray-500 text-white rounded-md">Cancel</button>
     <button  class=" delete-btn p-3 w-[45%] bg-red-500 text-white rounded-md">Delete</button>
     </div>
    `

    let elDelBtn = document.querySelector(".delete-btn")
    elDelBtn.addEventListener("click" , ()=>{
     axios.delete(`http://localhost:3000/todos/${id}`).then(()=>{
        getApi()
        AutoShowModal()
     })
    })
}

//update part
function updateBtn(id) {
    axios.get(`http://localhost:3000/todos/${id}`).then((res)=>{
     AutoShowModal(true)
    elModalInn.classList.remove("h-[300px]")
    elModalInn.classList.add("h-[230px]")
    elModalInn.innerHTML = `
    <h1 class="text-center text-[25px] text-blue-500 font-bold">Update item</h1>
        <form class="save-btn" autocoplete="off" >
    <input class=" edit-input mx-auto text-ceter w-full p-2 rounded-md border-[1px] border-blue-300 mt-2" type="text" value="${res.data.product}">
     <div class=" flex justify-center gap-[10px] pt-[40px]">
     <button  onclick="AutoShowModal(false)" class=" p-3 w-[45%] bg-gray-500 text-white rounded-md">Cancel</button>
     <button  class="  p-3 w-[45%] bg-blue-500 text-white rounded-md">Save</button>
     </div>
     </form>
     `
     let elSave = document.querySelector(".save-btn")
     let elInp = document.querySelector(".edit-input")
   
     elSave.addEventListener("submit" , (evt) =>{
        evt.preventDefault()
     let data = {
        product:elInp.value
     }
     axios.patch(`http://localhost:3000/todos/${id}`, data).then(()=>{
     getApi()
     AutoShowModal(false)
     })
     })
 })

}
