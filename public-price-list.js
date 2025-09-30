/**
 * BIMCORD Public Price List Widget
 * Versión con estilos inline - Sin dependencias CSS externas
 */
(function(global) {
    'use strict';

    // Configuración por defecto
    const DEFAULT_CONFIG = {
        projectId: null,
        apiBaseUrl: null,
        embedded: false
    };

    // Estilos base para el widget
    const WIDGET_STYLES = {
        container: `
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #111827;
            width: 100%;
            margin: 0;
            padding: 0;
            background: transparent;
            box-sizing: border-box;
        `,
        fullScreen: `
            min-height: 100vh;
            background-color: #f9fafb;
            padding: 1.5rem;
        `,
        embedded: `
            min-height: auto;
            background-color: transparent;
            padding: 0;
        `,
        centerContent: `
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f9fafb;
        `,
        textCenter: `
            text-align: center;
        `,
        projectHeader: `
            position: relative;
            height: 16rem;
            background: linear-gradient(to bottom right, #2563eb, #1d4ed8);
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin-bottom: 2rem;
        `,
        projectImage: `
            position: relative;
            width: 100%;
            height: 100%;
        `,
        projectImageImg: `
            width: 100%;
            height: 100%;
            object-fit: cover;
        `,
        projectImageOverlay: `
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.3);
        `,
        projectImagePlaceholder: `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        `,
        projectContent: `
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        `,
        projectTitle: `
            font-size: 2.25rem;
            line-height: 2.5rem;
            font-weight: 700;
            color: white;
            filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
            margin: 0;
        `,
        projectSubtitle: `
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.125rem;
            line-height: 1.75rem;
            margin: 0;
        `,
        sectionTitle: `
            font-size: 1.5rem;
            line-height: 2rem;
            font-weight: 700;
            color: #111827;
            margin: 0 0 2rem 0;
        `,
        blockCard: `
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
            padding: 1.5rem;
            margin-bottom: 2rem;
        `,
        blockHeader: `
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        `,
        blockTitle: `
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: #111827;
            margin: 0;
        `,
        blockInfo: `
            display: flex;
            align-items: center;
            gap: 1rem;
        `,
        blockName: `
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 600;
            color: #2563eb;
        `,
        blockCount: `
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #4b5563;
        `,
        tableContainer: `
            overflow-x: auto;
        `,
        table: `
            min-width: 100%;
            border-collapse: collapse;
            width: 100%;
        `,
        tableHeader: `
            background-color: #f9fafb;
        `,
        tableHeaderCell: `
            padding: 0.5rem 1rem;
            text-align: left;
            font-size: 0.75rem;
            line-height: 1rem;
            font-weight: 500;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #e5e7eb;
        `,
        tableBody: `
            background-color: white;
        `,
        tableRow: `
            border-bottom: 1px solid #e5e7eb;
        `,
        tableCell: `
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #111827;
            white-space: nowrap;
        `,
        tableCellPrice: `
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            color: #2563eb;
            white-space: nowrap;
        `,
        badge: `
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            line-height: 1rem;
            font-weight: 500;
            background-color: #dcfce7;
            color: #166534;
        `,
        errorMessage: `
            color: #dc2626;
            font-size: 1.25rem;
            line-height: 1.75rem;
            margin-bottom: 1rem;
            text-align: center;
        `,
        loadingSpinner: `
            width: 2rem;
            height: 2rem;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem auto;
        `,
        loadingTitle: `
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 600;
            color: #111827;
            margin: 0 0 0.5rem 0;
        `,
        loadingText: `
            color: #4b5563;
            margin: 0;
        `,
        emptyState: `
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
            padding: 1.5rem;
            text-align: center;
        `,
        emptyStateIcon: `
            width: 3rem;
            height: 3rem;
            color: #9ca3af;
            margin: 0 auto 1rem auto;
        `,
        emptyStateText: `
            color: #4b5563;
            margin: 0;
        `,
        icon: `
            width: 1em;
            height: 1em;
            fill: currentColor;
            vertical-align: middle;
        `,
        iconLarge: `
            width: 4rem;
            height: 4rem;
            color: rgba(255, 255, 255, 0.5);
        `,
        // Nuevos estilos para el botón "Me Interesa"
        interestButton: `
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 0.375rem;
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
            line-height: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            white-space: nowrap;
        `,
        interestButtonHover: `
            background-color: #1d4ed8;
        `,
        // Estilos para el modal
        modalOverlay: `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
        `,
        modalContent: `
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            width: 100%;
            max-width: 32rem;
            max-height: 90vh;
            overflow-y: auto;
        `,
        modalHeader: `
            padding: 2rem 2rem 1.5rem 2rem;
            position: relative;
        `,
        modalTitle: `
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            color: #111827;
            margin: 0 0 0.25rem 0;
            font-family: 'Poppins', sans-serif;
        `,
        modalSubtitle: `
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #6b7280;
            margin: 0;
            font-family: 'Poppins', sans-serif;
        `,
        modalBody: `
            padding: 0 2rem 1.5rem 2rem;
        `,
        modalFooter: `
            padding: 1rem 2rem 2rem 2rem;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        `,
        // Estilos mejorados para el formulario
        formGroup: `
            margin-bottom: 1.5rem;
        `,
        formLabel: `
            display: block;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 0.25rem;
            font-family: 'Poppins', sans-serif;
        `,
        formInput: `
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #111827;
            box-sizing: border-box;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
        `,
        formInputFocus: `
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        `,
        // Estilos mejorados para botones del modal
        buttonPrimary: `
            padding: 0.75rem 1.5rem;
            border: 1px solid transparent;
            color: white;
            font-weight: 500;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            background-color: #2563eb;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
            font-size: 0.875rem;
            line-height: 1.25rem;
        `,
        buttonSecondary: `
            padding: 0.75rem 1.5rem;
            border: 1px solid #d1d5db;
            color: #6b7280;
            font-weight: 500;
            border-radius: 0.5rem;
            background-color: white;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
            font-size: 0.875rem;
            line-height: 1.25rem;
        `,
        closeButton: `
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease-in-out;
        `,
        requiredAsterisk: `
            color: #ef4444;
        `,
        // Nuevos estilos para validación de errores
        formInputError: `
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #fef2f2;
            border: 1px solid #ef4444;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #111827;
            box-sizing: border-box;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
        `,
        formErrorMessage: `
            display: block;
            font-size: 0.75rem;
            line-height: 1rem;
            color: #ef4444;
            margin-top: 0.25rem;
            font-family: 'Poppins', sans-serif;
        `,
        buttonDisabled: `
            padding: 0.75rem 1.5rem;
            border: 1px solid transparent;
            color: white;
            font-weight: 500;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            background-color: #9ca3af;
            cursor: not-allowed;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
            font-size: 0.875rem;
            line-height: 1.25rem;
            opacity: 0.6;
        `
    };

    // Iconos SVG embebidos
    const ICONS = {
        building: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18"/>
            <path d="M5 21V7l8-4v18"/>
            <path d="M19 21V11l-6-4"/>
            <path d="M9 9v.01"/>
            <path d="M9 12v.01"/>
            <path d="M9 15v.01"/>
            <path d="M9 18v.01"/>
        </svg>`,
        alertCircle: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>`,
        close: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`,
        heart: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>`
    };

    // Agregar estilos de animación al documento
    const addAnimationStyles = () => {
        if (!document.getElementById('bimcord-animations')) {
            // Agregar fuente Poppins
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);

            const style = document.createElement('style');
            style.id = 'bimcord-animations';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.95) translateY(-10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }
                .bimcord-modal-overlay {
                    animation: fadeIn 0.2s ease-out;
                }
                .bimcord-modal-content {
                    animation: slideIn 0.2s ease-out;
                }
                .bimcord-interest-button:hover {
                    background-color: #1d4ed8 !important;
                }
                .bimcord-button-primary:hover {
                    background-color: #1e40af !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                }
                .bimcord-button-secondary:hover {
                    background-color: #f3f4f6 !important;
                    border-color: #9ca3af !important;
                }
                .bimcord-close-button:hover {
                    color: #374151 !important;
                    background-color: #f3f4f6 !important;
                }
                .bimcord-form-input:focus {
                    outline: none !important;
                    border-color: #2563eb !important;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
                    background-color: #ffffff !important;
                }
                .bimcord-form-input::placeholder {
                    color: #9ca3af !important;
                }
                .bimcord-form-input-error:focus {
                    outline: none !important;
                    border-color: #ef4444 !important;
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
                    background-color: #fef2f2 !important;
                }
                .bimcord-button-disabled:hover {
                    background-color: #9ca3af !important;
                    cursor: not-allowed !important;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Utilidades de formateo
    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: currency === 'USD' ? 'USD' : 'DOP',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Clase principal del widget
    class PublicPriceList {
        constructor(containerId, config = {}) {
            this.containerId = containerId;
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.container = null;
            this.data = null;
            this.currentModal = null;
            
            this.init();
        }

        init() {
            this.container = document.getElementById(this.containerId);
            if (!this.container) {
                throw new Error(`Contenedor con ID "${this.containerId}" no encontrado`);
            }

            // Agregar estilos de animación
            addAnimationStyles();

            // Aplicar estilos base al contenedor
            this.container.style.cssText = WIDGET_STYLES.container;
            
            this.loadData();
        }

        async loadData() {
            if (!this.config.projectId) {
                this.showError('ID de proyecto no proporcionado');
                return;
            }

            if (!this.config.apiBaseUrl) {
                this.showError('URL base de API no proporcionada');
                return;
            }

            this.showLoading();

            try {
                const response = await fetch(
                    `${this.config.apiBaseUrl}/api/projects/public-listas-precios/?proyecto_id=${this.config.projectId}`
                );

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                this.data = await response.json();
                this.render();
            } catch (error) {
                console.error('Error al cargar datos:', error);
                this.showError(`Error al cargar los datos: ${error.message}`);
            }
        }

        showLoading() {
            this.container.innerHTML = `
                <div style="${WIDGET_STYLES.centerContent}">
                    <div style="${WIDGET_STYLES.textCenter}">
                        <div style="${WIDGET_STYLES.loadingSpinner}"></div>
                        <h2 style="${WIDGET_STYLES.loadingTitle}">Cargando Listado de Precios...</h2>
                        <p style="${WIDGET_STYLES.loadingText}">Obteniendo detalles del listado de precios público...</p>
                    </div>
                </div>
            `;
        }

        showError(errorMessage) {
            this.container.innerHTML = `
                <div style="${WIDGET_STYLES.centerContent}">
                    <div style="${WIDGET_STYLES.textCenter}">
                        <div style="${WIDGET_STYLES.errorMessage}">${errorMessage}</div>
                        <p style="${WIDGET_STYLES.loadingText}">
                            Por favor, verifica que el ID del proyecto sea correcto e inténtalo nuevamente.
                        </p>
                    </div>
                </div>
            `;
        }

        getProjectImageHtml() {
            const project = this.data.proyecto_detail;
            return project?.imagen 
                ? `<div style="${WIDGET_STYLES.projectImage}">
                    <img 
                        src="${project.imagen}" 
                        alt="${project.nombre}"
                        style="${WIDGET_STYLES.projectImageImg}">
                    <div style="${WIDGET_STYLES.projectImageOverlay}"></div>
                </div>`
                : `<div style="${WIDGET_STYLES.projectImagePlaceholder}">
                    <div style="${WIDGET_STYLES.iconLarge}">${ICONS.building}</div>
                </div>`;
        }

        getEmptyStateHtml() {
            return this.data.blocks_with_units.length === 0 
                ? `<div style="${WIDGET_STYLES.emptyState}">
                    <div style="${WIDGET_STYLES.emptyStateIcon}">${ICONS.alertCircle}</div>
                    <p style="${WIDGET_STYLES.emptyStateText}">No hay unidades disponibles en este listado de precios.</p>
                </div>`
                : '';
        }

        render() {
            const project = this.data.proyecto_detail;
            const containerStyle = this.config.embedded ? WIDGET_STYLES.embedded : WIDGET_STYLES.fullScreen;
            
            this.container.innerHTML = `
                <div style="${containerStyle}">
                    <!-- Header del proyecto -->
                    <div style="${WIDGET_STYLES.projectHeader}">
                        ${this.getProjectImageHtml()}
                        <div style="${WIDGET_STYLES.projectContent}">
                            <h1 style="${WIDGET_STYLES.projectTitle}">
                                ${project?.nombre || 'Proyecto Sin Nombre'}
                            </h1>
                            <p style="${WIDGET_STYLES.projectSubtitle}">Listado de Precios Público</p>
                        </div>
                    </div>

                    <!-- Contenido principal -->
                    <div>
                        <h2 style="${WIDGET_STYLES.sectionTitle}">Unidades Disponibles</h2>
                        
                        ${this.getEmptyStateHtml()}
                        ${this.getBlocksHtml()}
                    </div>
                </div>
            `;

            // Agregar event listeners para los botones "Me Interesa"
            this.addEventListeners();
        }

        getBlocksHtml() {
            return this.data.blocks_with_units.map(block => {
                // Usar directamente las propiedades del bloque desde el JSON
                const blockName = block.nombre || 'Bloque Sin Nombre';
                const blockType = block.tipo || 'Tipo No Especificado';
                const unitsCount = block.units?.length || 0;

                const blockNameHtml = blockName !== 'Bloque Sin Nombre' 
                    ? `<span style="${WIDGET_STYLES.blockName}">
                        ${blockName}
                    </span>`
                    : '';

                const unitsCountHtml = unitsCount > 0 
                    ? `<span style="${WIDGET_STYLES.blockCount}">${unitsCount} unidades</span>`
                    : '';

                const tableHeaders = `
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Nivel</th>
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Área (m²)</th>
                    ${blockType === 'Residencial' ? 
                        `<th style="${WIDGET_STYLES.tableHeaderCell}">Balcón (m²)</th>` : 
                        ''}
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Parqueos</th>
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Precio</th>
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Estado</th>
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Acción</th>
                `;

                const tableRows = block.units?.length > 0 
                    ? block.units.map(unit => this.getUnitRowHtml(unit, blockType)).join('')
                    : `<tr style="${WIDGET_STYLES.tableRow}">
                        <td colspan="${blockType === 'Residencial' ? '7' : '6'}" style="${WIDGET_STYLES.tableCell}; text-align: center; color: #6b7280;">
                            No hay unidades disponibles en este bloque
                        </td>
                    </tr>`;

                return `
                    <div style="${WIDGET_STYLES.blockCard}">
                        <div style="${WIDGET_STYLES.blockHeader}">
                            <h3 style="${WIDGET_STYLES.blockTitle}">${blockName} (${blockType})</h3>
                            <div style="${WIDGET_STYLES.blockInfo}">
                                ${blockNameHtml}
                                ${unitsCountHtml}
                            </div>
                        </div>
                        
                        <div style="${WIDGET_STYLES.tableContainer}">
                            <table style="${WIDGET_STYLES.table}">
                                <thead style="${WIDGET_STYLES.tableHeader}">
                                    <tr>${tableHeaders}</tr>
                                </thead>
                                <tbody style="${WIDGET_STYLES.tableBody}">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }).join('');
        }

        getUnitRowHtml(unit, blockType) {
            const balconCell = blockType === 'Residencial' 
                ? `<td style="${WIDGET_STYLES.tableCell}">${unit.m2_balcon_from_block || '-'}</td>`
                : '';

            return `
                <tr style="${WIDGET_STYLES.tableRow}">
                    <td style="${WIDGET_STYLES.tableCell}">${unit.numero}</td>
                    <td style="${WIDGET_STYLES.tableCell}">${unit.area}</td>
                    ${balconCell}
                    <td style="${WIDGET_STYLES.tableCell}">${unit.parqueos_from_block || '-'}</td>
                    <td style="${WIDGET_STYLES.tableCellPrice}">${formatCurrency(unit.precio, 'USD')}</td>
                    <td style="${WIDGET_STYLES.tableCell}">
                        <span style="${WIDGET_STYLES.badge}">${unit.estado}</span>
                    </td>
                    <td style="${WIDGET_STYLES.tableCell}">
                        <button 
                            class="bimcord-interest-button" 
                            style="${WIDGET_STYLES.interestButton}"
                            data-unit-id="${unit.id}"
                            data-unit-number="${unit.numero}"
                            data-unit-price="${unit.precio}"
                            data-unit-area="${unit.area}">
                            ${ICONS.heart} Me Interesa
                        </button>
                    </td>
                </tr>
            `;
        }

        addEventListeners() {
            // Event listeners para botones "Me Interesa"
            const interestButtons = this.container.querySelectorAll('.bimcord-interest-button');
            interestButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const unitId = e.target.getAttribute('data-unit-id');
                    const unitNumber = e.target.getAttribute('data-unit-number');
                    const unitPrice = e.target.getAttribute('data-unit-price');
                    const unitArea = e.target.getAttribute('data-unit-area');
                    
                    this.showInterestModal({
                        id: unitId,
                        numero: unitNumber,
                        precio: unitPrice,
                        area: unitArea
                    });
                });
            });
        }

        showInterestModal(unit) {
            // Crear el modal
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'bimcord-modal-overlay';
            modalOverlay.style.cssText = WIDGET_STYLES.modalOverlay;

            const modalContent = document.createElement('div');
            modalContent.className = 'bimcord-modal-content';
            modalContent.style.cssText = WIDGET_STYLES.modalContent;

            modalContent.innerHTML = `
                <div style="${WIDGET_STYLES.modalHeader}; position: relative;">
                    <h3 style="${WIDGET_STYLES.modalTitle}">Expresar Interés</h3>
                    <p style="${WIDGET_STYLES.modalSubtitle}">
                        Unidad ${unit.numero} - ${unit.area}m² - ${formatCurrency(unit.precio, 'USD')}
                    </p>
                    <button 
                        class="bimcord-close-button" 
                        style="${WIDGET_STYLES.closeButton}"
                        type="button">
                        ${ICONS.close}
                    </button>
                </div>
                
                <div style="${WIDGET_STYLES.modalBody}">
                    <form class="bimcord-interest-form">
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="firstName">
                                Nombre *
                            </label>
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="Ingresa tu nombre">
                        </div>
                        
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="lastName">
                                Apellido *
                            </label>
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="Ingresa tu apellido">
                        </div>
                        
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="email">
                                Correo Electrónico *
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="ejemplo@correo.com">
                        </div>
                        
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="phone">
                                Teléfono/Celular *
                            </label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="(809) 000-0000">
                        </div>
                    </form>
                </div>
                
                <div style="${WIDGET_STYLES.modalFooter}">
                    <button 
                        type="button" 
                        class="bimcord-cancel-button bimcord-button-secondary"
                        style="${WIDGET_STYLES.buttonSecondary}">
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        class="bimcord-submit-button bimcord-button-primary"
                        style="${WIDGET_STYLES.buttonPrimary}">
                        Enviar Información
                    </button>
                </div>
            `;

            modalOverlay.appendChild(modalContent);
            document.body.appendChild(modalOverlay);

            // Guardar referencia del modal actual
            this.currentModal = modalOverlay;

            // Event listeners del modal
            this.addModalEventListeners(modalOverlay, unit);

            // Enfocar el primer input
            setTimeout(() => {
                const firstInput = modalContent.querySelector('#firstName');
                if (firstInput) firstInput.focus();
            }, 100);
        }

        addModalEventListeners(modalOverlay, unit) {
            const closeButton = modalOverlay.querySelector('.bimcord-close-button');
            const cancelButton = modalOverlay.querySelector('.bimcord-cancel-button');
            const submitButton = modalOverlay.querySelector('.bimcord-submit-button');
            const form = modalOverlay.querySelector('.bimcord-interest-form');

            // Inicializar validación
            this.initFormValidation(form, submitButton);

            // Cerrar modal
            const closeModal = () => {
                modalOverlay.remove();
                this.currentModal = null;
            };

            // Event listeners para cerrar
            closeButton.addEventListener('click', closeModal);
            cancelButton.addEventListener('click', closeModal);
            
            // Cerrar al hacer click fuera del modal
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            // Cerrar con tecla Escape
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);

            // Manejar envío del formulario
            const handleSubmit = (e) => {
                e.preventDefault();
                
                // Validar formulario antes de enviar
                if (!this.validateForm(form)) {
                    return;
                }
                
                const formData = new FormData(form);
                const data = {
                    unitId: unit.id,
                    unitNumber: unit.numero,
                    unitPrice: unit.precio,
                    unitArea: unit.area,
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone')
                };

                this.handleInterestSubmission(data);
                closeModal();
            };

            submitButton.addEventListener('click', handleSubmit);
            form.addEventListener('submit', handleSubmit);
        }

        // Nueva función para inicializar la validación del formulario
        initFormValidation(form, submitButton) {
            const inputs = form.querySelectorAll('input[required]');
            
            // Deshabilitar botón inicialmente
            this.updateSubmitButton(submitButton, false);
            
            inputs.forEach(input => {
                // Validación en tiempo real
                input.addEventListener('input', () => {
                    this.validateField(input);
                    this.updateSubmitButton(submitButton, this.isFormValid(form));
                });
                
                input.addEventListener('blur', () => {
                    this.validateField(input);
                    this.updateSubmitButton(submitButton, this.isFormValid(form));
                });
            });
        }

        // Función para validar un campo individual
        validateField(input) {
            const value = input.value.trim();
            const fieldName = input.name;
            let isValid = true;
            let errorMessage = '';

            // Limpiar errores previos
            this.clearFieldError(input);

            // Validaciones específicas por campo
            switch (fieldName) {
                case 'firstName':
                case 'lastName':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Este campo es obligatorio';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Debe tener al menos 2 caracteres';
                    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Solo se permiten letras y espacios';
                    }
                    break;

                case 'email':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El correo electrónico es obligatorio';
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Ingresa un correo electrónico válido';
                    }
                    break;

                case 'phone':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El teléfono es obligatorio';
                    } else if (!/^[\d\s\-\(\)\+]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Formato de teléfono inválido';
                    } else if (value.replace(/\D/g, '').length < 10) {
                        isValid = false;
                        errorMessage = 'El teléfono debe tener al menos 10 dígitos';
                    }
                    break;
            }

            if (!isValid) {
                this.showFieldError(input, errorMessage);
            }

            return isValid;
        }

        // Función para mostrar error en un campo
        showFieldError(input, message) {
            input.style.cssText = WIDGET_STYLES.formInputError;
            
            // Crear o actualizar mensaje de error
            let errorElement = input.parentNode.querySelector('.bimcord-error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'bimcord-error-message';
                errorElement.style.cssText = WIDGET_STYLES.formErrorMessage;
                input.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }

        // Función para limpiar errores de un campo
        clearFieldError(input) {
            input.style.cssText = WIDGET_STYLES.formInput;
            
            const errorElement = input.parentNode.querySelector('.bimcord-error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }

        // Función para validar todo el formulario
        validateForm(form) {
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        // Función para verificar si el formulario es válido
        isFormValid(form) {
            const inputs = form.querySelectorAll('input[required]');
            
            for (let input of inputs) {
                const value = input.value.trim();
                if (!value) return false;
                
                // Verificar que no haya errores visibles
                const errorElement = input.parentNode.querySelector('.bimcord-error-message');
                if (errorElement) return false;
            }
            
            return true;
        }

        // Función para actualizar el estado del botón de envío
        updateSubmitButton(button, isEnabled) {
            if (isEnabled) {
                button.style.cssText = WIDGET_STYLES.buttonPrimary;
                button.disabled = false;
                button.textContent = 'Enviar Información';
            } else {
                button.style.cssText = WIDGET_STYLES.buttonDisabled;
                button.disabled = true;
                button.textContent = 'Complete todos los campos';
            }
        }

        handleInterestSubmission(data) {
            // Por ahora solo mostramos los datos en consola
            // Más adelante aquí se implementará el envío al backend
            console.log('Datos de interés enviados:', data);
            
            // Mostrar mensaje de confirmación temporal
            alert(`¡Gracias ${data.firstName}! Hemos recibido tu interés en la unidad ${data.unitNumber}. Nos pondremos en contacto contigo pronto.`);
        }

        // Método público para actualizar configuración
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.loadData();
        }

        // Método público para destruir el widget
        destroy() {
            if (this.currentModal) {
                this.currentModal.remove();
                this.currentModal = null;
            }
            
            if (this.container) {
                this.container.innerHTML = '';
                this.container.style.cssText = '';
            }
        }
    }

    // API pública
    const PublicPriceListAPI = {
        init: function(containerId, config = {}) {
            return new PublicPriceList(containerId, config);
        },
        
        version: '2.1.0'
    };

    // Exponer API globalmente
    global.PublicPriceList = PublicPriceListAPI;

})(window);