import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEbike } from '../../redux/ebike/ebikeSlice';
import './ebikes.css';

function RemoveEbike() {
  const dispatch = useDispatch();
  const { ebikes } = useSelector((state) => state.ebikeSlice);
  const { user } = useSelector((state) => state.authSlice);

  const handleDeleteEbike = (id) => {
    dispatch(deleteEbike(id));
  };
  return (
    <div className="container">
      <h1 className="title">RemoveEbike</h1>
      <div className="container box ">
        {
                ebikes && ebikes.length > 0 ? ebikes.map((ebike) => (ebike.seller_id === user.id
                  ? (
                    <div key={ebike.id} className="table_row_2">
                      <div className="table_item">{ebike.model}</div>
                      <div className="table_item">
                        <button className="btn btn-delete" type="button" onClick={() => handleDeleteEbike(ebike.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                  : null))
                  : <p>You have not created any ebikes yet!</p>
           }
      </div>
    </div>
  );
}

export default RemoveEbike;
