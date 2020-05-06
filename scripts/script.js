document.addEventListener('DOMContentLoaded', () => {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {
				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});

function checkInput(inputType) {
	if (inputType === 'email') {
		let emailInput = document.querySelector('.email-input');
		if (isEmailValid(emailInput.value)) {
			validInput(emailInput);
		} else {
			invalidInput(emailInput);
		}
	} else if (inputType === 'phone') {
		let phoneInput = document.querySelector('.phone-input');
		if (isPhoneValid(document.querySelector('.phone-input').value)) {
			validInput(phoneInput);
		} else {
			invalidInput(phoneInput);
		}
	} else if (inputType === 'password') {
		let passwordInput = document.querySelector('.password-input');
		if (
			!isPasswordValid(passwordInput.value).size &&
			!isPasswordValid(passwordInput.value).upperAndLower &&
			!isPasswordValid(passwordInput.value).hasNumber
		) {
			validInput(passwordInput);
		} else {
			invalidInput(passwordInput);
		}
	} else if (inputType === 'confirm') {
		let confirmInput = document.querySelector('.confirm-input');
    if (confirmInput.value === document.querySelector('.password-input').value) {
      validInput(confirmInput);
    } else {
      invalidInput(confirmInput);
    }
	}

	function isEmailValid(email) {
		let regexTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regexTest.test(email);
	}

	function isPhoneValid(phoneNum) {
		let regexTest = /^\(\d+\) (\d){5}\-(\d){4}$/;
		return regexTest.test(phoneNum);
	}

	function isPasswordValid(password) {
		let invalid = { size: true, upperAndLower: true, hasNumber: true };
		if (password.length >= 8) {
			invalid.size = false;
		}
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
			invalid.upperAndLower = false;
		}
		if (/\d/.test(password)) {
			invalid.hasNumber = false;
		}
		return invalid;
	}

	function isConfirmValid(password, confirm) {
		return password == confirm;
	}

	function validInput(input) {
		input.classList.remove('is-success');
		input.classList.remove('is-danger');
		input.classList.remove('is-warning');
		input.classList.add('is-success');
    let icon = input.parentElement.querySelector(".state-icon");
		let help = input.parentElement.parentElement.querySelector(".help");
    help.classList.add("is-hidden");
    icon.style.color = "green";
    icon.textContent = "done";
	}

	function invalidInput(input) {
		input.classList.remove('is-success');
		input.classList.remove('is-danger');
		input.classList.remove('is-warning');
		input.classList.add('is-danger');
    let help = input.parentElement.parentElement.querySelector(".help");
    help.classList.remove("is-hidden");
    let icon = input.parentElement.querySelector(".state-icon");
    icon.style.color = "red";
    icon.textContent = "clear";
	}
}

function formatPhoneNum(phoneNum) {
	phoneNum = phoneNum
		.trim()
		.split('')
		.filter(digit => {
			return /\d/.test(digit);
		})
		.join('');
	if (phoneNum == "") {
		return "";
	}
	phoneNum = '(' + phoneNum.slice(0, 2) + ') ' + phoneNum.slice(2, 7) + '-' + phoneNum.slice(7, 11);
	return phoneNum;
}


document.querySelector('.phone-input').addEventListener('focus', () => {
	document.querySelector(".phone-checkbox").classList.remove("is-hidden");
});
document.querySelector('.phone-input').addEventListener('blur', () => {
	if (document.querySelector('.phone-input').value == "") {
		document.querySelector(".phone-checkbox").classList.add("is-hidden");
	}
});


document.querySelector('.phone-input').addEventListener('change', () => {
	document.querySelector('.phone-input').value = formatPhoneNum(
		document.querySelector('.phone-input').value
	);
	checkInput("phone");
});


document.querySelector('.email-input').addEventListener('change', () => {
	checkInput("email");
});
document.querySelector('.password-input').addEventListener('change', () => {
	checkInput("password");
	checkInput("confirm");
});


document.querySelector('.confirm-input').addEventListener('change', () => {
	checkInput("confirm");
});
