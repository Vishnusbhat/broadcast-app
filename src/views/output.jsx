import './output.css'
import CopyButton from '../copy';

const Output = ({ broadcast }) => {
  //   return ;
  return (
    
    <div className="output-container">
         <CopyButton broadcast={broadcast} />
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
