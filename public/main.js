// select all buttons w/ class of delete from DOM and create array
const deleteButtons = Array.from(document.querySelectorAll('.delete'));
//loop thru deleteButtons arr
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
})

const itemImg = document.querySelectorAll('img');
const collectedItemImg = document.querySelectorAll('img.owned')

//loop thru deleteButtons arr
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
})

Array.from(itemImg).forEach((img) => {
    if (!img.classList.contains('owned')){
        img.addEventListener('click', markOwned)
    }
})

Array.from(collectedItemImg).forEach((img) => {
    img.addEventListener('click', markNotOwned)
})

async function deleteItem(){
    try{
        let itemName = this.parentNode.childNodes[1].innerText;
        console.log(itemName)
        const result = await fetch('/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: itemName
            })
        })

        const data = await result.json();
        console.log(data)
        location.reload();
    } catch(err){
        console.error(`Error deleting item: ${err}`)
    }
}

async function markOwned(){
    let itemName = this.parentNode.childNodes[1].innerText;
    try{
        const result = await fetch('/markOwned', {
            method: 'put',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                name: itemName
            })
        })
        const data = await result.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.error(`Error marking owned: ${err}`)
    }
}

async function markNotOwned(){
    let itemName = this.parentNode.childNodes[1].innerText;
    try{
        const result = await fetch('/markNotOwned', {
            method: 'put',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                name: itemName
            })
        })
        const data = await result.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.error(`Error marking not owned: ${err}`)
    }
}