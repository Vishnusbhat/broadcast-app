import './output.css'
import CopyButton from '../copy';
import Whatsapp from '../whatsapp';
import DBButton from '../dbwrite';

const Output = ({ broadcast, setOpenForm }) => {
  //   return ;
  return (
    
    <div className="output-container">
         <CopyButton broadcast={broadcast} />
         <Whatsapp broadcast={broadcast} />
         <DBButton setOpenForm={setOpenForm}/>
      <div className='heading'>SwiftCast</div>
      {broadcast === "" ? (
        <></>
      ) : (
        <>
          <pre>{broadcast}</pre>
        </>
      )}
    </div>
  );
};

export default Output;
