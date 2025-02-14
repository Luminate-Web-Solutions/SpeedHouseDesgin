import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'speedhouse';
  isMobileMenuOpen = false;  // Tracks the state of the mobile menu
  isDropdownOpen = false;    // Tracks the state of the dropdown

  ngOnInit() {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    const popupMessage = document.getElementById('popupMessage') as HTMLDivElement;

    contactForm.addEventListener('submit', (event: Event) => {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(contactForm);

      fetch('submit_contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          popupMessage.innerText = data.message;
          popupMessage.style.color = 'green';
          contactForm.reset(); // Clear the form fields
        } else {
          popupMessage.innerText = data.message;
          popupMessage.style.color = 'red';
        }
        popupMessage.style.display = 'block';
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }

  // Listen to window scroll events to change header background
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  // Toggle the mobile menu visibility
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Toggle the dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Listen to window resize events to close the mobile menu on larger screens
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }
}