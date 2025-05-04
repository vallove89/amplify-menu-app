import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DashboardListProps {
  items: any[];
  heading: string;
  type: string;
}



const ItemList: React.FC<DashboardListProps> = ({ heading, type, items }) => {
  const router = useRouter();
  const currentPath = router.asPath; // Get the current path
  const [hide,setHide] = useState<boolean>(true)

  const navigateToCreate = () => {
    router.push({
      pathname: `${currentPath}/${type}/create` 
    });
  };

  const navigateToUpdate = ( id: string ) => {
    router.push({
      pathname: `${currentPath}/${type}/update`,
      query: { id: id }, 
    });
  };

  const navigateToDelete = ( id: string ) => {
    router.push({
      pathname: `${currentPath}/${type}/delete`,
      query: { id: id }, 
    });
  };


  return (
    <div>
      <div>
        <h2>{heading}</h2>
        <button onClick={() => setHide(!hide)}>{ hide ? 'show' : 'hide'}</button>
      </div>
      {
        hide ?
        null 
        :
        <>
          {
            items.length > 0 ?
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <p>{item.name}</p>
                    <div>
                      <button onClick={() => navigateToUpdate(item.id)}>update</button>
                      <button onClick={() => navigateToDelete(item.id)}>delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            :
            <p>No {type} data</p>
          }
        </>
      }
      <div>
        <button onClick={() => navigateToCreate()}>create</button>
      </div>      
    </div>
  );
};

export default ItemList;
