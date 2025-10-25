// Toggle sidebar, accesibilidad y navegación entre secciones
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('adminMenuToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const menuItems = Array.from(document.querySelectorAll('.admin-sidebar__menu-item'));
  const sections = Array.from(document.querySelectorAll('.content-section'));

  // Función para cerrar el sidebar
  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('admin-sidebar--open');
      sidebar.classList.remove('active');
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Función para abrir el sidebar
  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add('admin-sidebar--open');
      sidebar.classList.add('active');
    }
    if (overlay) {
      overlay.classList.add('active');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    if (window.innerWidth <= 1100) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }

  // Función para cambiar sección activa
  function activateRoute(routeSelector) {
    if (!routeSelector) return;
    
    // Ocultar todas las secciones
    sections.forEach(s => s.classList.remove('active'));
    
    // Mostrar la sección seleccionada
    const target = document.querySelector(routeSelector);
    if (target) {
      target.classList.add('active');
    }

    // Actualizar item activo en el menú
    menuItems.forEach(item => {
      item.classList.remove('admin-sidebar__menu-item--active');
      if (item.dataset.route === routeSelector) {
        item.classList.add('admin-sidebar__menu-item--active');
      }
    });
  }

  // Toggle del sidebar
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sidebar.classList.contains('admin-sidebar--open') || 
                     sidebar.classList.contains('active');
      
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  // Cerrar sidebar al hacer clic en el overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeSidebar();
    });
  }

  // Hacer los items navegables por click y teclado
  menuItems.forEach(item => {
    const route = item.dataset.route;
    
    // click
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // activar ruta si corresponde
      if (route) {
        activateRoute(route);
      }

      // cerrar sidebar en móvil/tablet
      if (window.innerWidth <= 1100) {
        closeSidebar();
      }
    });

    // keyboard (Enter / Space)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Cerrar sidebar al cambiar tamaño de ventana si procede
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
      closeSidebar();
    }
  });

  // Prevenir scroll cuando el sidebar está abierto en móvil
  document.addEventListener('touchmove', (e) => {
    if (window.innerWidth <= 1100 && 
        (sidebar?.classList.contains('admin-sidebar--open') || 
         sidebar?.classList.contains('active'))) {
      if (!sidebar.contains(e.target)) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  // Manejar la navegación inicial si hay hash en la URL
  if (window.location.hash) {
    activateRoute(window.location.hash);
  }
});