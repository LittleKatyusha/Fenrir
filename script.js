/**
 * FENRIR ASHENVEIL — FRONTIER ARCHIVE
 * Interactive dossier interface
 */

document.addEventListener('DOMContentLoaded', () => {
  initBootSequence();
  initNavigation();
  initMobileMenu();
  initSectionAnimations();
  initAbilitiesAnimations();
});

/* ============================================
   BOOT SEQUENCE
   ============================================ */
function initBootSequence() {
  const bootOverlay = document.getElementById('boot-overlay');
  const bootLog = document.getElementById('boot-log');
  const bootProgress = document.getElementById('boot-progress');
  const mainInterface = document.getElementById('main-interface');

  const bootMessages = [
    { text: '> Initializing Frontier Archive systems...', delay: 100 },
    { text: '> Loading biometric databases...', delay: 400 },
    { text: '> Connecting to deep-space relay...', delay: 700 },
    { text: '> Signal acquired — Sector 7G', delay: 1000 },
    { text: '> Decrypting dossier files...', delay: 1300 },
    { text: '> Subject: FENRIR ASHENVEIL', delay: 1600 },
    { text: '> Status: AT LARGE', delay: 1900 },
    { text: '> Warning: Classified material', delay: 2200 },
    { text: '> Access granted — Level 3 clearance', delay: 2500 },
    { text: '> Rendering interface...', delay: 2800 },
  ];

  let progress = 0;
  const progressIncrement = 100 / bootMessages.length;

  bootMessages.forEach((msg, index) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'boot-log-line';
      line.textContent = msg.text;
      bootLog.appendChild(line);

      // Auto-scroll to bottom
      bootLog.scrollTop = bootLog.scrollHeight;

      // Update progress
      progress += progressIncrement;
      bootProgress.style.width = `${Math.min(progress, 100)}%`;

      // Complete boot sequence
      if (index === bootMessages.length - 1) {
        setTimeout(() => {
          bootOverlay.classList.add('hidden');
          mainInterface.classList.remove('hidden');
        }, 800);
      }
    }, msg.delay);
  });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetSection = link.getAttribute('data-section');

      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Switch sections with fade
      sections.forEach(section => {
        if (section.id === targetSection) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });

      // Scroll to top of content
      document.querySelector('.content').scrollTop = 0;
    });
  });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !sidebar) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('open');
    if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu when clicking a nav link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuToggle.classList.remove('active');
      sidebar.classList.remove('open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================
   SECTION ANIMATIONS
   ============================================ */
function initSectionAnimations() {
  // Add stagger animation to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Add hover effect to data rows
  const dataRows = document.querySelectorAll('.data-row');
  dataRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = 'var(--color-bg-tertiary)';
      row.style.paddingLeft = '8px';
      row.style.paddingRight = '8px';
      row.style.marginLeft = '-8px';
      row.style.marginRight = '-8px';
      row.style.transition = 'all 0.2s ease';
    });

    row.addEventListener('mouseleave', () => {
      row.style.backgroundColor = 'transparent';
      row.style.paddingLeft = '0';
      row.style.paddingRight = '0';
      row.style.marginLeft = '0';
      row.style.marginRight = '0';
    });
  });

  // Add click-to-expand for log entries
  const logEntries = document.querySelectorAll('.log-entry');
  logEntries.forEach(entry => {
  entry.addEventListener('click', () => {
  entry.style.transform = entry.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
  entry.style.transition = 'transform 0.3s ease';
  });
  });
  
  // Backstory panel reveal animation
  const backstoryPanels = document.querySelectorAll('.backstory-content .data-panel');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function revealBackstoryPanels() {
  backstoryPanels.forEach((panel, index) => {
  panel.classList.remove('revealed');
  setTimeout(() => {
  panel.classList.add('revealed');
  }, index * 300);
  });
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.getAttribute('data-section') === 'backstory') {
        setTimeout(revealBackstoryPanels, 200);
      }
      if (link.getAttribute('data-section') === 'abilities') {
        setTimeout(animateAbilitiesRange, 300);
      }
    });
  });
}

/* ============================================
ABILITIES ANIMATIONS
============================================ */
function initAbilitiesAnimations() {
  // Animate range bar on initial load if abilities is active
  const abilitiesSection = document.getElementById('abilities');
  if (abilitiesSection && abilitiesSection.classList.contains('active')) {
    setTimeout(animateAbilitiesRange, 500);
  }

  // Add hover glow effect to ability features
  const abilityFeatures = document.querySelectorAll('.ability-feature');
  abilityFeatures.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      const icon = feature.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    feature.addEventListener('mouseleave', () => {
      const icon = feature.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });

  // Add hover highlight to spec rows
  const specRows = document.querySelectorAll('.spec-row');
  specRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = 'var(--color-bg-panel)';
      row.style.paddingLeft = '12px';
      row.style.paddingRight = '12px';
      row.style.marginLeft = '-4px';
      row.style.marginRight = '-4px';
      row.style.transition = 'all 0.2s ease';
    });

    row.addEventListener('mouseleave', () => {
      row.style.backgroundColor = 'transparent';
      row.style.paddingLeft = 'var(--space-sm)';
      row.style.paddingRight = 'var(--space-sm)';
      row.style.marginLeft = '0';
      row.style.marginRight = '0';
    });
  });

  // Add neural pulse animation to hacking ability icon on click
  const hackingCard = document.getElementById('ability-hacking');
  if (hackingCard) {
    const hackingIcon = hackingCard.querySelector('.ability-icon-wrap');
    hackingCard.addEventListener('click', () => {
      if (hackingIcon) {
        hackingIcon.classList.add('neural-pulse');
        setTimeout(() => {
          hackingIcon.classList.remove('neural-pulse');
        }, 1000);
      }
    });
  }

  // Add neural pulse animation to agility ability icon on click
  const agilityCard = document.getElementById('ability-agility');
  if (agilityCard) {
    const agilityIcon = agilityCard.querySelector('.ability-icon-wrap');
    agilityCard.addEventListener('click', () => {
      if (agilityIcon) {
        agilityIcon.classList.add('neural-pulse');
        setTimeout(() => {
          agilityIcon.classList.remove('neural-pulse');
        }, 1000);
      }
    });
  }

  // Interactive turn cycle simulation on agility card
  if (agilityCard) {
    const cyclePhases = agilityCard.querySelectorAll('.cycle-phase');
    cyclePhases.forEach(phase => {
      phase.addEventListener('click', () => {
        // Remove active highlight from all phases
        cyclePhases.forEach(p => p.classList.remove('cycle-highlight'));
        // Add highlight to clicked phase
        phase.classList.add('cycle-highlight');
        setTimeout(() => {
          phase.classList.remove('cycle-highlight');
        }, 2000);
      });
    });
  }

  // Kinetic charge ability — icon pulse on click
  const kineticCard = document.getElementById('ability-kinetic');
  if (kineticCard) {
    const kineticIcon = kineticCard.querySelector('.ability-icon-wrap');
    kineticCard.addEventListener('click', () => {
      if (kineticIcon) {
        kineticIcon.classList.add('neural-pulse');
        setTimeout(() => {
          kineticIcon.classList.remove('neural-pulse');
        }, 1000);
      }
    });

    // Interactive charge stack — click to simulate charge/discharge
    const chargeSegments = kineticCard.querySelectorAll('.charge-segment');
    let currentChargeLevel = 0;
    const maxCharge = 5;

    chargeSegments.forEach((segment, index) => {
      segment.style.cursor = 'pointer';
      segment.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering card click

        if (currentChargeLevel === maxCharge) {
          // Discharge — reset all
          currentChargeLevel = 0;
          chargeSegments.forEach(seg => {
            seg.classList.remove('filled');
            const fill = seg.querySelector('.charge-fill');
            if (fill) fill.classList.remove('animated');
          });
          // Flash the discharge indicator
          const dischargeIndicator = kineticCard.querySelector('.charge-discharge-indicator');
          if (dischargeIndicator) {
            dischargeIndicator.style.boxShadow = '0 0 20px var(--color-rust)';
            dischargeIndicator.style.transition = 'box-shadow 0.3s ease';
            setTimeout(() => {
              dischargeIndicator.style.boxShadow = 'none';
            }, 800);
          }
        } else {
          // Charge up to clicked level
          currentChargeLevel = index + 1;
          chargeSegments.forEach((seg, i) => {
            const fill = seg.querySelector('.charge-fill');
            if (i < currentChargeLevel) {
              seg.classList.add('filled');
              if (fill) fill.classList.add('animated');
            } else {
              seg.classList.remove('filled');
              if (fill) fill.classList.remove('animated');
            }
          });
        }
      });
    });
  }
}

function animateAbilitiesRange() {
  const rangeBar = document.getElementById('range-bar-hacking');
  if (rangeBar) {
    // Reset and re-animate
    rangeBar.classList.remove('animated');
    rangeBar.style.width = '0';

    // Force reflow
    void rangeBar.offsetWidth;

    requestAnimationFrame(() => {
      rangeBar.classList.add('animated');
    });
  }

  // Animate agility cycle bars
  const activeBar = document.getElementById('agility-active-bar');
  const cooldownBar = document.getElementById('agility-cooldown-bar');

  if (activeBar) {
    activeBar.classList.remove('animated');
    void activeBar.offsetWidth;
    requestAnimationFrame(() => {
      activeBar.classList.add('animated');
    });
  }

  if (cooldownBar) {
    cooldownBar.classList.remove('animated');
    void cooldownBar.offsetWidth;
    requestAnimationFrame(() => {
      cooldownBar.classList.add('animated');
    });
  }

  // Animate kinetic charge stack — stagger fill
  const chargeFills = document.querySelectorAll('.charge-fill[id^="kinetic-fill-"]');
  if (chargeFills.length > 0) {
    chargeFills.forEach(fill => {
      fill.classList.remove('animated');
    });
    void chargeFills[0].offsetWidth;

    chargeFills.forEach((fill, index) => {
      setTimeout(() => {
        fill.classList.add('animated');
      }, 300 + index * 200);
    });
  }
}
