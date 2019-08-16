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
