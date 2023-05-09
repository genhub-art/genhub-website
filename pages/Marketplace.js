import Title from '../components/Title';
import { useEffect, useState } from 'react';

export default function Marketplace(props) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {

  }, [])
  return (
    <div>
        <Title title="Marketplace" />
        <div className="spacer-60"></div>
    </div>
  )
}