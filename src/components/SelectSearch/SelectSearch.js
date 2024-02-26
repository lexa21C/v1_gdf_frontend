import { useState, useEffect } from "react";
import axios from "axios";

export default function SelectBuscador(props) {
  const [busqueda, setBusqueda] = useState('');
  const [data, setdata] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [optionSelected, setOptionSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(props.apiGet);
      setdata(data.results);
    };
    fetchData(busqueda);
  }, [props.apiGet, busqueda]);

  useEffect(() => {
    if (props.selectedValue) {
      setBusqueda(props.selectedValue);
      setOptionSelected(true);
    }
  }, [props.selectedValue]);

  const selectvalue = (event) => {
    setBusqueda(event.target.id);
    setOptionSelected(true);
    props.onSelect(event.target.dataset.value);
  };

  const handleInputChange = (event) => {
    const valorBusqueda = event.target.value;
    setBusqueda(valorBusqueda);
    setOptionSelected(false);
  
    if (valorBusqueda === '') {
      // If the input is cleared, show all options
      setOpciones(data.map((record) => ({ id: record._id, value: record[props.completeNamesProp] || '' })));
    } else {
      const filteredData = data
        .filter((record) =>
          (record[props.completeNamesProp] || '').toLowerCase().includes(valorBusqueda.toLowerCase())
        )
        .map((record) => ({ id: record._id, value: record[props.completeNamesProp] || '' }));
  
      setOpciones(filteredData);
    }
  };
  

  return (
    <div>
      <input type="text" value={busqueda} onChange={handleInputChange} required />
      {!optionSelected && (
        <ul>
          {opciones && opciones.length > 0 && (
  <ul>
    {opciones.map((opcion) => (
      <li key={opcion.id} data-value={opcion.id} id={opcion.value} onClick={selectvalue}>
        {opcion.value}
      </li>
    ))}
  </ul>
)}
        </ul>
      )}
    </div>
  );
}
