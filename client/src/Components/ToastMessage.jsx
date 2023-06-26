import Toast from 'react-bootstrap/Toast';

function ToastMessage() {
    return (
      <Toast>
        <Toast.Header>
          <img src="" className="rounded me-2" alt="" />
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>Test</Toast.Body>
      </Toast>
    );
  }
  
  export default ToastMessage;