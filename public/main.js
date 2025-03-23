// select all buttons w/ class of delete from DOM and create array
const deleteButtons = Array.from(document.querySelectorAll('.delete'));
//loop thru deleteButtons arr
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
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