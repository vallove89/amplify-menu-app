import { useState, useEffect } from "react"

interface ConnectionFormProps {
    objects: any[],
    ids: string[],
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({ objects, ids }) => {
    const [belongToIds,setBelongToIds] = useState<string[]>([]);
    const [belongToArray,setBelongToArray] = useState<any[]>([]);
    

    const isIdInArray = (id: string) => {
        return belongToIds.includes(id);
    }

    const handleAddToIds = (id: string) => {
        if (id !== ""){
            setBelongToIds((prevBelongToIds) => [...prevBelongToIds, id]);
        }
    }

    const handleRemoveToIds = (id: string) => {
        console.log("id passed to handleRemoveToIds: ",id)
        console.log("BelongToIds: ",belongToIds)
        if (id !== ""){
            setBelongToIds((prevBelongToIds) => prevBelongToIds.filter(string => string !== id));
        }
    }

    useEffect(() => {
        setBelongToIds(ids);
        setBelongToArray(objects);
    },[]);

    useEffect(() => {
        const filterObjects = () => {
            const filtered = objects.filter(obj => belongToIds.includes(obj.id));
            setBelongToArray(filtered);
        }
        filterObjects();
    },[belongToIds]);
    
    return (
        <div>
            {
                objects.length > 0 ?
                <div>
                    <div>
                        {objects.map((obj,i) => (
                                <div key={i}>
                                    <h4>{obj?.title}</h4>
                                    <p>{obj?.description}</p>
                                    {
                                        isIdInArray(obj.id) ?
                                        <button onClick={() => handleRemoveToIds(obj.id)}>Remove</button> 
                                        :
                                        <button onClick={() => handleAddToIds(obj.id)}>Add</button>
                                    }
                                </div>
                        ))}
                    </div>
                    <div>
                        {belongToArray.length > 0 ?
                            <div>
                                {belongToArray.map((obj,i) => (
                                    <div key={i}>
                                        <h4>{obj?.title}</h4>
                                        <p>{obj?.description}</p>
                                        <button onClick={() => handleRemoveToIds(obj.id)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            :
                            <p>Empty ...</p>
                        }
                    </div>
                </div>
                :
                <p>No data ...</p>
            }
        </div>
    )
}

export default ConnectionForm;