import { useSelector } from 'react-redux';

export default function EbikeIndex() {
  const { ebikes } = useSelector((state) => state.ebikeSlice);

  return (
    <div>
      Ebikes

      {
      ebikes.map((item) => (
        <div>{item.name}</div>
      ))
    }

    </div>
  );
}
