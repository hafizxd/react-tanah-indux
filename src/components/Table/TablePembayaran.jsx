import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { DeleteConfirmation } from "../UPTDashboard/DeleteConfirmation";


export const TablePembayaran = ({ payment }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <div>
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <div
        className="row text-dark"
        style={{
          background: "#FFFFFF",
          padding: "15px",
          borderBottom: "#BCBCBC 1px solid",
        }}
      >
        <div
          to="/upt/detail"
          className="col number d-flex align-items-center justify-content-center font-semibold "
        >
          1
        </div>
        <div className="col">
          <p className="table-title p-0 m-0">TAHUN</p>
          <p className="p-0 m-0">{ payment.year }</p>
        </div>
        <div className="col">
          <p className="table-title p-0 m-0">JUMLAH PEMBAYARAN</p>
          <p className="p-0 m-0">{ formatter.format(payment.payment_amount) }</p>
        </div>
        <div className="col">
          <p className="table-title p-0 m-0">BUKTI PEMBAYARAN</p>
          <p className="p-0 m-0 filename">BUKTI.JPG</p>
        </div>
        <div className="col d-flex gap-2 align-items-center justify-content-center w-100 p-0">
          {/* <div
            className="d-flex justify-content-center align-items-center p-1 btn"
            style={{
              color: "#286973",
              borderRadius: "50%",
              background: "#EDF9FB",
              aspectRatio: "1",
              flexShrink: "none",
              fontSize: "20px",
            }}
          >
            <FaRegEdit />
          </div> */}
          <div
            className="d-flex justify-content-center align-items-center p-1 btn"
            style={{
              color: "#DC2F2F",
              borderRadius: "50%",
              aspectRatio: "1",
              flexShrink: "none",
              fontSize: "20px",
            }}
            onClick={() => {
                setShow(true);
              }}
          >
            <FaRegTrashAlt />
          </div>
        </div>
      </div>
    </div>
  );
};
