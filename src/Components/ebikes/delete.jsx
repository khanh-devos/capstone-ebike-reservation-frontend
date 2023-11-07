import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

export default function EbikeIndex() {
  const { ebikes } = useSelector((state) => state.ebikeSlice);

  return (
    <div>
      Ebikes

      {
      ebikes.map((item) => (
        <div key={uuidv4()}>{item.name}</div>
      ))
    }

    </div>
  );
}
