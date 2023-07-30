import React, { useEffect, useState } from 'react';
import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {

    const [reload, setReload] = useState(false);

    function Reload() {
        setReload(true);
    }

    /*This method 'drag', will create the drag and drop functionality for the items. */
    /*The code for this method is just one simple line of code. This line of code simply stores the id value of the item being dragged. */
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    /*In this method our code indicates that the default even that would ordinarily be fired should be cancelled for the target element. So with the below code we are indicating that we are overiding the default behavior here.*/
    function allowDrop(ev) {
        ev.preventDefault();
    }

    /* This is the event handler function for the drop method.*/
    /*Our code wil reference the target element where we wish to drop the dragged element. */
    /*This checks if an image element already exists as a child element in the target element it'll be disallowed*/
    /*This will additionally check if the element has no child elements. We only want the drop functionality to be performed successfully if there are no child elements.*/
    /*If the element has no child elements, then the relevant item in the items array will be changed accordingly. The ranking property will be changed to the ranking value denoted by the cell into which the user is dropping the relevant item, managing state for the items array by using the use State hook so the change in value of the ranking property of the relevant item will then trigger our rank items compnents to be re-rendered which means the image element that the user has dragged onto the ranking grid will remain in the appropriate cell on the ranking grid.*/
    /*The execution of this line of code will trigger the ranking items component to re-render*/

    function drop(ev) {

        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
            { ...item, ranking: parseInt(targetElm.id.substring(5)) } : {...item, ranking: item.ranking});
            setItems(transformedCollection);
        }
    }

    useEffect(() => {
        
        if (items == null) {
            getDataFromApi();
        }

    }, [dataType])

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })

    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    }, [items])

    useEffect(() => {
        if (reload === true) {
            getDataFromApi();
        }
    }, [reload])

    /*There are references to the methods to re-render the ranking items component in the RankingGrid component by naming properties and having them equal their functions.*/
    return (
        (items != null)?
        <main>
            <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop } />
            <ItemCollection items={items} drag={drag} imgArr={imgArr } />
                <button onClick={Reload} className="reload" style={{ "marginTop": "10px" }}> <span class="text ">Reload</span> </button>
        </main>
        : <main>Loading...</main>
    )
}
export default RankItems;