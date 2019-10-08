'use strict';

class Plugin {
  addClass(element, classe) {
    element.classList.add(classe);
  }

  removeClass(element, classe) {
    element.classList.remove(classe);
  }

  addClasses(elements, classe) {
    this.elements = elements;
    this.elements.forEach(element => {
      element.classList.remove(classe);
    });
  }

  removeClasses(elements, classe) {
    this.elements = document.querySelectorAll(elements);
    this.elements.forEach(element => {
      element.parentNode.classList.remove(classe);
    });
  }

  sticky(element, classe) {
    this.element = document.querySelector(element);
    window.addEventListener('scroll', () => {
      if (window.scrollY > this.element.offsetHeight) {
        this.addClass(this.element, classe);
      } else {
        this.removeClass(this.element, classe);
      }
    });
  }

  sliderProduct(images, thumbs, descriptions) {
    // Images
    this.images = document.querySelectorAll(images + ' > .image');
    this.images.forEach((image) => {
      console.log(image);
    });
    
    // Descriptions
    this.descriptions = document.querySelectorAll(descriptions + ' > .description');
    this.descriptions.forEach((description, index) => {
      console.log(description);
    });
    
    // Thumbs
    this.thumbs = document.querySelectorAll(thumbs + ' > .thumb');
    this.thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', event => activeSlider(event, index, this.images, this.thumbs, this.descriptions));
    });
    
    // Active Thumbs
    function activeSlider(event, index, images, thumbs, descriptions) {
      event.preventDefault();
      ++index;

      images.forEach(image => image.classList.remove('active'));
      thumbs.forEach(thumb => thumb.classList.remove('active'));
      descriptions.forEach(description => description.classList.remove('active'));

      // Active
      document.querySelector('.product .image:nth-child(' + index + ')').classList.add('active');
      document.querySelector('.product .description:nth-child(' + index + ')').classList.add('active');
      event.currentTarget.classList.add('active');
    }
  }

  navScroll(elements, offset, classe) {
    this.offset = document.querySelector(offset).offsetHeight;
    this.elements = document.querySelectorAll(elements);
    this.classe = classe;

    this.elements.forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();

        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href);

        this.elements.forEach(element => {
          this.removeClass(element, this.classe);
        });

        this.addClass(event.currentTarget, this.classe);

        window.scrollTo({
          top: section.offsetTop - this.offset,
          behavior: 'smooth'
        });
      });
    });
  }

  scrollToTop(element) {
    const button = document.querySelector(element);
    window.addEventListener('scroll', checkScrollToTopButton);

    // Smooth scroll
    function checkScrollToTopButton() {
      if (window.scrollY > document.body.offsetHeight * 0.1) {
        button.classList.add('show-scroll');
      } else {
        button.classList.remove('show-scroll');
      }
    }

    // Scroll to top
    button.addEventListener('click', event => {
      event.preventDefault();
      document.body.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }
}

const plugin = new Plugin();

plugin.sticky('.nav', 'fixed');
plugin.scrollToTop('#scroll-top');
plugin.navScroll('.nav a', 'nav', 'active');
plugin.sliderProduct('.product .images', '.product .thumbs', '.product .descriptions');

// Contact

const contactForm = document.querySelector('.contact form');
const notification = document.querySelector('.contact .notification');
const status = document.querySelector('.contact .status');
const closeNotificationButton = document.querySelector('.contact .notification .button');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  fetch(contactForm.getAttribute('action'), {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams(formData).toString()
  }).then(res => {
    if (res) {
      status.textContent = 'Mensagem enviada com sucesso!';
      notification.classList.add('show', 'success');
    } else {
      status.textContent = 'A mensagem não foi enviada, por favor tente mais tarde.';
      notification.classList.add('show', 'warning');
    }
  });
});

closeNotificationButton.addEventListener('click', e => {
  e.preventDefault();
  let notification = document.querySelector('.contact .notification');
  notification.classList.remove('show');
});
