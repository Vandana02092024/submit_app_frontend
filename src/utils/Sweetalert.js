import Swal from 'sweetalert2';

export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message || 'Action was successful!',
    confirmButtonText: 'Okay',
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message || 'Something went wrong!',
    confirmButtonText: 'Try Again',
  });
};

export const showInfoAlert = (message) => {
  return Swal.fire({
    icon: 'info',
    title: message,
    timer: 1500,
    timerProgressBar: true,
    // text: message || 'Here is some information!',
    // confirmButtonText: 'Got it!',
  });
};

export const showWarningAlert = async (message,confirmButtonText,) => {
    return Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message || 'Be careful!',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'No, cancel', 
    });
};

export const showCustomAlert = (icon, title, message) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
    confirmButtonText: 'Okay',
  });
};

export const showAlert = (response) => {
  if (response.status === 'success') {
    showSuccessAlert(response.message);
  } else if (response.status === 'error') {
    showErrorAlert(response.message);
  } else if (response.status === 'warning') {
    showWarningAlert(response.message);
  } else if (response.status === 'info') {
    showInfoAlert(response.message);
  }
};

