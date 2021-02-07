const DEFAULT_STATE = {
    items:[{id:0,name:'The Last Days of John Lennon',finished:false,
    description:'The greatest true-crime story in music history, as only James Patterson can tell it.',price:15.99,category:'History'
    }
],
    finishedCount:0,
    visible:true,
    totalCount:1
};

export default (state = DEFAULT_STATE, action)=>{
    switch(action.type){
        case 'Get':
            const newState = JSON.parse(JSON.stringify(state));
            newState.items = action.items;
            return newState;

        case 'Modify':
            const changeState = JSON.parse(JSON.stringify(state));

            let temCount = 0;
            changeState.items.forEach((item,index)=>{
                if(action.itemId === item.id){
                    item.finished = action.flag;
                }
                if(item.finished){
                    temCount += 1;
                }
            });

            changeState.finishedCount = temCount;
            return changeState;

        case 'Delete':
            const delState = JSON.parse(JSON.stringify(state));
            let tempCount = 0;
            delState.items.forEach((item,index)=>{
                if(action.itemId === item.id){
                    console.log(item.id);
                    delState.items.splice(index, 1);
                }
            })

            delState.items.forEach((item,inxed)=>{
                if(item.finished){
                    tempCount += 1;
                }
            })
            
            delState.finishedCount = tempCount;
            return delState;

        case 'Add':
            const addState = JSON.parse(JSON.stringify(state));
            addState.items.push(action.item);
            addState.totalCount++;
            return addState;
        case 'Edit':
            const editState = JSON.parse(JSON.stringify(state));
            editState.items.forEach((item,index)=>{
                if(action.item.id === item.id){
                    editState.items[index] = action.item;
                }
            })
            return editState;
        default:
            return state;
    }

}