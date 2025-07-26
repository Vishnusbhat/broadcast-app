import './output.css'

const Output = ({ broadcast }) => {
  //   return ;
  return (
    
    <div className="output-container">
        
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
