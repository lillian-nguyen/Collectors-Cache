// select all buttons w/ class of delete from DOM and create array
const deleteButtons = Array.from(document.querySelectorAll('.delete'));
//loop thru deleteButtons arr
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
})

async function deleteItem(){
    try{
        let itemName = this.parentNode.textContent;
        // itemName = itemName.trim().split(' by ')[0];

        const result = await fetch('/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                item: itemName
            })
        })

        const data = await result.json();
        console.log(data)
        location.reload();
    } catch(err){
        console.error(`Error deleting item: ${err}`)
    }
}