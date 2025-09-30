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
            max-width: 40rem;
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
        formGroupHalf: `
            margin-bottom: 1.5rem;
            width: 48%;
            display: inline-block;
            vertical-align: top;
        `,
        formGroupHalfLeft: `
            margin-bottom: 1.5rem;
            width: 48%;
            display: inline-block;
            vertical-align: top;
            margin-right: 4%;
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
        // Estilos para botones de tipo de documento
        documentTypeButtons: `
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        `,
        documentTypeButton: `
            flex: 1;
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
            line-height: 1rem;
            font-weight: 500;
            border-radius: 0.5rem;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            text-align: center;
            font-family: 'Poppins', sans-serif;
            border: 1px solid #d1d5db;
            background-color: white;
            color: #6b7280;
        `,
        documentTypeButtonActive: `
            flex: 1;
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
            line-height: 1rem;
            font-weight: 500;
            border-radius: 0.5rem;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            text-align: center;
            font-family: 'Poppins', sans-serif;
            border: 1px solid #2563eb;
            background-color: #2563eb;
            color: white;
        `,
        // Estilos para el dropdown de nacionalidades
        nationalityDropdown: `
            position: relative;
        `,
        nationalityInput: `
            display: block;
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
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
        nationalitySearchIcon: `
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            width: 1rem;
            height: 1rem;
        `,
        nationalityList: `
            position: absolute;
            z-index: 10;
            margin-top: 0.25rem;
            width: 100%;
            background-color: white;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            max-height: 15rem;
            overflow-y: auto;
        `,
        nationalityItem: `
            padding: 0.75rem 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #111827;
            font-family: 'Poppins', sans-serif;
        `,
        nationalityItemHover: `
            background-color: #f3f4f6;
        `,
        nationalityNoResults: `
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #6b7280;
            font-family: 'Poppins', sans-serif;
        `,
        // Estilos para subida de archivos
        fileUploadArea: `
            border: 2px dashed #d1d5db;
            border-radius: 0.5rem;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            background-color: #f9fafb;
        `,
        fileUploadAreaHover: `
            border-color: #2563eb;
            background-color: #eff6ff;
        `,
        fileUploadIcon: `
            width: 2rem;
            height: 2rem;
            color: #9ca3af;
            margin: 0 auto 0.5rem auto;
        `,
        fileUploadText: `
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #6b7280;
            margin: 0 0 0.25rem 0;
            font-family: 'Poppins', sans-serif;
        `,
        fileUploadSubtext: `
            font-size: 0.75rem;
            line-height: 1rem;
            color: #9ca3af;
            margin: 0;
            font-family: 'Poppins', sans-serif;
        `,
        filePreview: `
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
            background-color: #f3f4f6;
            border-radius: 0.5rem;
        `,
        filePreviewInfo: `
            display: flex;
            align-items: center;
        `,
        filePreviewIcon: `
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.5rem;
        `,
        filePreviewName: `
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #111827;
            font-family: 'Poppins', sans-serif;
        `,
        fileRemoveButton: `
            color: #ef4444;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease-in-out;
        `,
        fileRemoveButtonHover: `
            background-color: #fef2f2;
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
        `,
        // Estilos para información adicional
        infoBox: `
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
        `,
        infoText: `
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #1e40af;
            margin: 0;
            font-family: 'Poppins', sans-serif;
        `,
        documentHint: `
            font-size: 0.75rem;
            line-height: 1rem;
            color: #6b7280;
            margin-top: 0.25rem;
            font-family: 'Poppins', sans-serif;
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
        </svg>`,
        search: `<svg style="${WIDGET_STYLES.nationalitySearchIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
        </svg>`,
        upload: `<svg style="${WIDGET_STYLES.fileUploadIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>`,
        fileText: `<svg style="${WIDGET_STYLES.filePreviewIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14,2 L14,8 L20,8 M14,2 L20,8 L20,20 C20,21.1045695 19.1045695,22 18,22 L6,22 C4.8954305,22 4,21.1045695 4,20 L4,4 C4,2.8954305 4.8954305,2 6,2 L14,2 Z"/>
        </svg>`,
        image: `<svg style="${WIDGET_STYLES.filePreviewIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
        </svg>`,
        x: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`
    };

    // Lista de nacionalidades
    const NACIONALIDADES = [
        'Dominicana', 'Estadounidense', 'Española', 'Mexicana', 'Colombiana', 
        'Venezolana', 'Argentina', 'Chilena', 'Peruana', 'Brasileña', 
        'Canadiense', 'Italiana', 'Francesa', 'Alemana', 'Británica',
        'Cubana', 'Haitiana', 'Puertorriqueña', 'Jamaiquina', 'Ecuatoriana',
        'Uruguaya', 'Paraguaya', 'Boliviana', 'Costarricense', 'Panameña',
        'Guatemalteca', 'Hondureña', 'Nicaragüense', 'Salvadoreña', 'Beliceña'
    ];

    // Configuración de validación por tipo de documento
    const DOCUMENT_CONFIG = {
        Cedula: {
            maxLength: 11,
            pattern: /^\d{11}$/,
            placeholder: '00112345678',
            description: '11 dígitos sin guiones'
        },
        RNC: {
            maxLength: 9,
            pattern: /^\d{9}$/,
            placeholder: '123456789',
            description: '9 dígitos'
        },
        Pasaporte: {
            maxLength: 9,
            pattern: /^[A-Z0-9]{9}$/,
            placeholder: 'A12345678',
            description: '9 caracteres (letras y números)'
        }
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
                .bimcord-document-type-button:hover {
                    background-color: #f3f4f6 !important;
                }
                .bimcord-nationality-item:hover {
                    background-color: #f3f4f6 !important;
                }
                .bimcord-file-upload-area:hover {
                    border-color: #2563eb !important;
                    background-color: #eff6ff !important;
                }
                .bimcord-file-remove-button:hover {
                    background-color: #fef2f2 !important;
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
                            Por favor, verifica que el ID del proyecto sea correcto y que tengas conexión a internet.
                        </p>
                    </div>
                </div>
            `;
        }

        render() {
            if (!this.data || !this.data.proyecto) {
                this.showError('No se encontraron datos del proyecto');
                return;
            }

            const { proyecto, bloques } = this.data;
            
            // Aplicar estilos según el modo
            if (!this.config.embedded) {
                this.container.style.cssText += WIDGET_STYLES.fullScreen;
            } else {
                this.container.style.cssText += WIDGET_STYLES.embedded;
            }

            this.container.innerHTML = `
                ${this.renderProjectHeader(proyecto)}
                ${this.renderBlocks(bloques)}
            `;

            // Agregar event listeners para los botones de interés
            this.addInterestButtonListeners();
        }

        renderProjectHeader(proyecto) {
            return `
                <div style="${WIDGET_STYLES.projectHeader}">
                    ${proyecto.imagen_principal ? `
                        <div style="${WIDGET_STYLES.projectImage}">
                            <img src="${proyecto.imagen_principal}" alt="${proyecto.nombre}" style="${WIDGET_STYLES.projectImageImg}">
                            <div style="${WIDGET_STYLES.projectImageOverlay}"></div>
                        </div>
                    ` : `
                        <div style="${WIDGET_STYLES.projectImagePlaceholder}">
                            ${ICONS.building.replace(WIDGET_STYLES.icon, WIDGET_STYLES.iconLarge)}
                        </div>
                    `}
                    <div style="${WIDGET_STYLES.projectContent}">
                        <h1 style="${WIDGET_STYLES.projectTitle}">${proyecto.nombre}</h1>
                        <p style="${WIDGET_STYLES.projectSubtitle}">Listado de Precios Público</p>
                    </div>
                </div>
            `;
        }

        renderBlocks(bloques) {
            if (!bloques || bloques.length === 0) {
                return `
                    <div style="${WIDGET_STYLES.emptyState}">
                        <div style="${WIDGET_STYLES.emptyStateIcon}">
                            ${ICONS.building}
                        </div>
                        <p style="${WIDGET_STYLES.emptyStateText}">
                            No hay unidades disponibles en este momento.
                        </p>
                    </div>
                `;
            }

            return bloques.map(bloque => `
                <div style="${WIDGET_STYLES.blockCard}">
                    <div style="${WIDGET_STYLES.blockHeader}">
                        <div style="${WIDGET_STYLES.blockInfo}">
                            <h2 style="${WIDGET_STYLES.blockTitle}">${bloque.nombre}</h2>
                            <span style="${WIDGET_STYLES.blockCount}">
                                ${bloque.unidades.length} unidad${bloque.unidades.length !== 1 ? 'es' : ''}
                            </span>
                        </div>
                    </div>
                    ${this.renderUnitsTable(bloque.unidades)}
                </div>
            `).join('');
        }

        renderUnitsTable(unidades) {
            if (!unidades || unidades.length === 0) {
                return `
                    <p style="${WIDGET_STYLES.emptyStateText}">No hay unidades disponibles en este bloque.</p>
                `;
            }

            return `
                <div style="${WIDGET_STYLES.tableContainer}">
                    <table style="${WIDGET_STYLES.table}">
                        <thead style="${WIDGET_STYLES.tableHeader}">
                            <tr>
                                <th style="${WIDGET_STYLES.tableHeaderCell}">Unidad</th>
                                <th style="${WIDGET_STYLES.tableHeaderCell}">Área (m²)</th>
                                <th style="${WIDGET_STYLES.tableHeaderCell}">Precio</th>
                                <th style="${WIDGET_STYLES.tableHeaderCell}">Estado</th>
                                <th style="${WIDGET_STYLES.tableHeaderCell}">Acción</th>
                            </tr>
                        </thead>
                        <tbody style="${WIDGET_STYLES.tableBody}">
                            ${unidades.map(unidad => `
                                <tr style="${WIDGET_STYLES.tableRow}">
                                    <td style="${WIDGET_STYLES.tableCell}">${unidad.numero}</td>
                                    <td style="${WIDGET_STYLES.tableCell}">${unidad.area}</td>
                                    <td style="${WIDGET_STYLES.tableCellPrice}">
                                        ${formatCurrency(unidad.precio, 'USD')}
                                    </td>
                                    <td style="${WIDGET_STYLES.tableCell}">
                                        <span style="${WIDGET_STYLES.badge}">Disponible</span>
                                    </td>
                                    <td style="${WIDGET_STYLES.tableCell}">
                                        <button 
                                            class="bimcord-interest-button" 
                                            style="${WIDGET_STYLES.interestButton}"
                                            data-unit-id="${unidad.id}"
                                            data-unit-number="${unidad.numero}"
                                            data-unit-area="${unidad.area}"
                                            data-unit-price="${unidad.precio}">
                                            Me Interesa
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        addInterestButtonListeners() {
            const buttons = this.container.querySelectorAll('.bimcord-interest-button');
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const unit = {
                        id: e.target.dataset.unitId,
                        numero: e.target.dataset.unitNumber,
                        area: e.target.dataset.unitArea,
                        precio: parseFloat(e.target.dataset.unitPrice)
                    };
                    this.showInterestModal(unit);
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
                        <!-- Nombres y Apellidos -->
                        <div style="${WIDGET_STYLES.formGroupHalfLeft}">
                            <label style="${WIDGET_STYLES.formLabel}" for="nombres">
                                Nombres <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="nombres" 
                                name="nombres" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="Ej: Juan Carlos">
                        </div>
                        
                        <div style="${WIDGET_STYLES.formGroupHalf}">
                            <label style="${WIDGET_STYLES.formLabel}" for="apellidos">
                                Apellidos <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="apellidos" 
                                name="apellidos" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="Ej: Pérez Gómez">
                        </div>

                        <!-- Tipo de Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}">
                                Tipo de Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <div style="${WIDGET_STYLES.documentTypeButtons}">
                                <button type="button" class="bimcord-document-type-button" data-type="Cedula" style="${WIDGET_STYLES.documentTypeButtonActive}">Cédula</button>
                                <button type="button" class="bimcord-document-type-button" data-type="RNC" style="${WIDGET_STYLES.documentTypeButton}">RNC</button>
                                <button type="button" class="bimcord-document-type-button" data-type="Pasaporte" style="${WIDGET_STYLES.documentTypeButton}">Pasaporte</button>
                            </div>
                            <input type="hidden" id="tipo_documento" name="tipo_documento" value="Cedula">
                        </div>

                        <!-- Número de Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="numero_documento">
                                Número de Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="numero_documento" 
                                name="numero_documento" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="00112345678"
                                maxlength="11">
                            <p style="${WIDGET_STYLES.documentHint}" class="document-hint">11 dígitos sin guiones</p>
                        </div>

                        <!-- Nacionalidad -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="nacionalidad">
                                Nacionalidad <span class="nationality-required" style="${WIDGET_STYLES.requiredAsterisk}; display: none;">*</span>
                            </label>
                            <div style="${WIDGET_STYLES.nationalityDropdown}">
                                ${ICONS.search}
                                <input 
                                    type="text" 
                                    id="nacionalidad" 
                                    name="nacionalidad" 
                                    class="bimcord-form-input bimcord-nationality-input"
                                    style="${WIDGET_STYLES.nationalityInput}"
                                    placeholder="Buscar nacionalidad..."
                                    autocomplete="off">
                                <div class="bimcord-nationality-list" style="${WIDGET_STYLES.nationalityList}; display: none;"></div>
                            </div>
                        </div>

                        <!-- Fecha de Vencimiento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="fecha_vencimiento_documento">
                                Fecha de Vencimiento del Documento <span class="expiry-required" style="${WIDGET_STYLES.requiredAsterisk}; display: none;">*</span>
                            </label>
                            <input 
                                type="date" 
                                id="fecha_vencimiento_documento" 
                                name="fecha_vencimiento_documento" 
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                min="${new Date().toISOString().split('T')[0]}">
                        </div>

                        <!-- Email y Teléfono -->
                        <div style="${WIDGET_STYLES.formGroupHalfLeft}">
                            <label style="${WIDGET_STYLES.formLabel}" for="email">
                                Correo Electrónico <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
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
                        
                        <div style="${WIDGET_STYLES.formGroupHalf}">
                            <label style="${WIDGET_STYLES.formLabel}" for="telefono_celular">
                                Teléfono Celular <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <input 
                                type="tel" 
                                id="telefono_celular" 
                                name="telefono_celular" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="+1 (809) 555-1234">
                        </div>

                        <!-- Subir Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}">
                                Subir Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <div class="bimcord-file-upload-area" style="${WIDGET_STYLES.fileUploadArea}">
                                <input type="file" id="documento_imagen" name="documento_imagen" accept="image/*,application/pdf" style="display: none;" required>
                                <div class="upload-content">
                                    ${ICONS.upload}
                                    <p style="${WIDGET_STYLES.fileUploadText}">Haz clic para subir el documento</p>
                                    <p style="${WIDGET_STYLES.fileUploadSubtext}">PNG, JPG, PDF hasta 5MB</p>
                                </div>
                                <div class="file-preview" style="display: none;"></div>
                            </div>
                        </div>

                        <!-- Información adicional -->
                        <div style="${WIDGET_STYLES.infoBox}">
                            <p style="${WIDGET_STYLES.infoText}">
                                <strong>Nota:</strong> Si el correo electrónico ya existe en el sistema, se enviará una invitación al usuario existente para vincular este cliente a su cuenta.
                            </p>
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
                        style="${WIDGET_STYLES.buttonDisabled}"
                        disabled>
                        Complete todos los campos
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
                const firstInput = modalContent.querySelector('#nombres');
                if (firstInput) firstInput.focus();
            }, 100);
        }

        addModalEventListeners(modalOverlay, unit) {
            const closeButton = modalOverlay.querySelector('.bimcord-close-button');
            const cancelButton = modalOverlay.querySelector('.bimcord-cancel-button');
            const submitButton = modalOverlay.querySelector('.bimcord-submit-button');
            const form = modalOverlay.querySelector('.bimcord-interest-form');

            // Inicializar funcionalidades del formulario
            this.initDocumentTypeButtons(modalOverlay);
            this.initNationalityDropdown(modalOverlay);
            this.initFileUpload(modalOverlay);
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
                    nombres: formData.get('nombres'),
                    apellidos: formData.get('apellidos'),
                    tipo_documento: formData.get('tipo_documento'),
                    numero_documento: formData.get('numero_documento'),
                    nacionalidad: formData.get('nacionalidad'),
                    fecha_vencimiento_documento: formData.get('fecha_vencimiento_documento'),
                    email: formData.get('email'),
                    telefono_celular: formData.get('telefono_celular'),
                    documento_imagen: formData.get('documento_imagen')
                };

                this.handleInterestSubmission(data);
                closeModal();
            };

            submitButton.addEventListener('click', handleSubmit);
            form.addEventListener('submit', handleSubmit);
        }

        // Inicializar botones de tipo de documento
        initDocumentTypeButtons(modalOverlay) {
            const buttons = modalOverlay.querySelectorAll('.bimcord-document-type-button');
            const hiddenInput = modalOverlay.querySelector('#tipo_documento');
            const numeroDocumento = modalOverlay.querySelector('#numero_documento');
            const documentHint = modalOverlay.querySelector('.document-hint');
            const nationalityRequired = modalOverlay.querySelector('.nationality-required');
            const expiryRequired = modalOverlay.querySelector('.expiry-required');
            const nacionalidadInput = modalOverlay.querySelector('#nacionalidad');
            const fechaVencimiento = modalOverlay.querySelector('#fecha_vencimiento_documento');

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.dataset.type;
                    
                    // Actualizar estilos de botones
                    buttons.forEach(btn => {
                        btn.style.cssText = WIDGET_STYLES.documentTypeButton;
                    });
                    button.style.cssText = WIDGET_STYLES.documentTypeButtonActive;
                    
                    // Actualizar valor oculto
                    hiddenInput.value = type;
                    
                    // Actualizar configuración del campo de número
                    const config = DOCUMENT_CONFIG[type];
                    numeroDocumento.placeholder = config.placeholder;
                    numeroDocumento.maxLength = config.maxLength;
                    numeroDocumento.value = ''; // Limpiar valor
                    documentHint.textContent = config.description;
                    
                    // Mostrar/ocultar campos requeridos según el tipo
                    if (type === 'Pasaporte') {
                        nationalityRequired.style.display = 'inline';
                        expiryRequired.style.display = 'inline';
                        nacionalidadInput.required = true;
                        fechaVencimiento.required = true;
                    } else {
                        nationalityRequired.style.display = 'none';
                        expiryRequired.style.display = 'none';
                        nacionalidadInput.required = false;
                        fechaVencimiento.required = false;
                    }
                    
                    // Limpiar errores
                    this.clearFieldError(numeroDocumento);
                });
            });

            // Manejar entrada de número de documento
            numeroDocumento.addEventListener('input', (e) => {
                const type = hiddenInput.value;
                const config = DOCUMENT_CONFIG[type];
                let value = e.target.value;
                
                // Filtrar caracteres según el tipo
                if (type === 'Cedula' || type === 'RNC') {
                    value = value.replace(/\D/g, '');
                } else if (type === 'Pasaporte') {
                    value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                }
                
                // Limitar longitud
                if (value.length > config.maxLength) {
                    value = value.substring(0, config.maxLength);
                }
                
                e.target.value = value;
            });
        }

        // Inicializar dropdown de nacionalidades
        initNationalityDropdown(modalOverlay) {
            const input = modalOverlay.querySelector('.bimcord-nationality-input');
            const dropdown = modalOverlay.querySelector('.bimcord-nationality-list');
            let isOpen = false;

            const showDropdown = () => {
                dropdown.style.display = 'block';
                isOpen = true;
                this.updateNationalityList(dropdown, input.value);
            };

            const hideDropdown = () => {
                dropdown.style.display = 'none';
                isOpen = false;
            };

            input.addEventListener('focus', showDropdown);
            input.addEventListener('input', () => {
                if (!isOpen) showDropdown();
                this.updateNationalityList(dropdown, input.value);
            });

            // Cerrar al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                    hideDropdown();
                }
            });
        }

        // Actualizar lista de nacionalidades
        updateNationalityList(dropdown, searchTerm) {
            const filtered = NACIONALIDADES.filter(nacionalidad =>
                nacionalidad.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filtered.length === 0) {
                dropdown.innerHTML = `
                    <div style="${WIDGET_STYLES.nationalityNoResults}">
                        No se encontraron resultados
                    </div>
                `;
                return;
            }

            dropdown.innerHTML = filtered.map(nacionalidad => `
                <div class="bimcord-nationality-item" style="${WIDGET_STYLES.nationalityItem}" data-value="${nacionalidad}">
                    ${nacionalidad}
                </div>
            `).join('');

            // Agregar event listeners a los items
            dropdown.querySelectorAll('.bimcord-nationality-item').forEach(item => {
                item.addEventListener('click', () => {
                    const input = dropdown.parentNode.querySelector('.bimcord-nationality-input');
                    input.value = item.dataset.value;
                    dropdown.style.display = 'none';
                                    // Limpiar errores si los hay
                    this.clearFieldError(input);
                    
                    // Validar el campo
                    this.validateField(input);
                });

                item.addEventListener('mouseenter', () => {
                    item.style.cssText = WIDGET_STYLES.nationalityItem + '; background-color: #f3f4f6;';
                });

                item.addEventListener('mouseleave', () => {
                    item.style.cssText = WIDGET_STYLES.nationalityItem;
                });
            });
        }

                // Configurar subida de archivos
        setupFileUpload(container) {
            const fileInput = container.querySelector('#documentUpload');
            const uploadArea = container.querySelector('.bimcord-file-upload-area');
            const previewContainer = container.querySelector('.bimcord-file-preview-container');

            // Click en el área de subida
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });

            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.cssText = WIDGET_STYLES.fileUploadArea + '; border-color: #2563eb; background-color: #eff6ff;';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.cssText = WIDGET_STYLES.fileUploadArea;
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.cssText = WIDGET_STYLES.fileUploadArea;
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelection(files[0], previewContainer, uploadArea);
                }
            });

            // Selección de archivo
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleFileSelection(file, previewContainer, uploadArea);
                }
            });
        }

        // Manejar selección de archivo
        handleFileSelection(file, previewContainer, uploadArea) {
            // Validar tipo de archivo
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                this.showFileError('El archivo debe ser una imagen (JPG, PNG) o un PDF');
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showFileError('El archivo no puede ser mayor a 5MB');
                return;
            }

            // Mostrar preview
            this.showFilePreview(file, previewContainer, uploadArea);
            
            // Limpiar errores
            this.clearFileError();
        }

        // Mostrar preview del archivo
        showFilePreview(file, previewContainer, uploadArea) {
            const isImage = file.type.startsWith('image/');
            const isPDF = file.type === 'application/pdf';

            uploadArea.style.display = 'none';
            previewContainer.style.display = 'block';

            previewContainer.innerHTML = `
                <div style="${WIDGET_STYLES.filePreview}">
                    <div style="${WIDGET_STYLES.filePreviewInfo}">
                        ${isImage ? ICONS.image : ICONS.fileText}
                        <span style="${WIDGET_STYLES.filePreviewName}">${file.name}</span>
                    </div>
                    <button type="button" class="bimcord-file-remove" style="${WIDGET_STYLES.fileRemoveButton}">
                        ${ICONS.close}
                    </button>
                </div>
                ${isImage ? `
                    <div style="margin-top: 0.75rem;">
                        <img id="imagePreview" style="max-width: 100%; height: 8rem; object-fit: contain; border-radius: 0.5rem;" />
                    </div>
                ` : ''}
            `;

            // Si es imagen, mostrar preview
            if (isImage) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = previewContainer.querySelector('#imagePreview');
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }

            // Botón para remover archivo
            const removeButton = previewContainer.querySelector('.bimcord-file-remove');
            removeButton.addEventListener('click', () => {
                this.removeFile(previewContainer, uploadArea);
            });

            removeButton.addEventListener('mouseenter', () => {
                removeButton.style.cssText = WIDGET_STYLES.fileRemoveButton + '; background-color: #fef2f2;';
            });

            removeButton.addEventListener('mouseleave', () => {
                removeButton.style.cssText = WIDGET_STYLES.fileRemoveButton;
            });

            // Guardar referencia del archivo
            previewContainer.dataset.fileName = file.name;
            previewContainer.dataset.fileSize = file.size;
            previewContainer.dataset.fileType = file.type;
        }

        // Remover archivo
        removeFile(previewContainer, uploadArea) {
            previewContainer.style.display = 'none';
            previewContainer.innerHTML = '';
            uploadArea.style.display = 'block';
            
            // Limpiar input file
            const fileInput = document.getElementById('documentUpload');
            if (fileInput) {
                fileInput.value = '';
            }
            
            // Limpiar datos del archivo
            delete previewContainer.dataset.fileName;
            delete previewContainer.dataset.fileSize;
            delete previewContainer.dataset.fileType;
        }

        // Mostrar error de archivo
        showFileError(message) {
            const container = document.querySelector('.bimcord-file-upload-container');
            let errorElement = container.querySelector('.bimcord-file-error');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'bimcord-file-error';
                errorElement.style.cssText = WIDGET_STYLES.formErrorMessage;
                container.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
        }

        // Limpiar error de archivo
        clearFileError() {
            const errorElement = document.querySelector('.bimcord-file-error');
            if (errorElement) {
                errorElement.remove();
            }
        }

        // Configurar botones de tipo de documento
        setupDocumentTypeButtons(container) {
            const buttons = container.querySelectorAll('.bimcord-document-type-btn');
            const documentInput = container.querySelector('#numeroDocumento');
            const documentHint = container.querySelector('.bimcord-document-hint');

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remover clase activa de todos los botones
                    buttons.forEach(btn => {
                        btn.style.cssText = WIDGET_STYLES.documentTypeButton;
                    });
                    
                    // Activar botón seleccionado
                    button.style.cssText = WIDGET_STYLES.documentTypeButtonActive;
                    
                    // Limpiar campo de documento
                    documentInput.value = '';
                    this.clearFieldError(documentInput);
                    
                    // Actualizar placeholder y hint
                    const type = button.dataset.type;
                    this.updateDocumentField(type, documentInput, documentHint);
                });
            });
        }

        // Actualizar campo de documento según el tipo
        updateDocumentField(type, input, hint) {
            const configs = {
                'Cedula': {
                    placeholder: '00112345678',
                    hint: '11 dígitos sin guiones',
                    maxLength: 11
                },
                'RNC': {
                    placeholder: '123456789',
                    hint: '9 dígitos',
                    maxLength: 9
                },
                'Pasaporte': {
                    placeholder: 'A12345678',
                    hint: '9 caracteres (letras y números)',
                    maxLength: 9
                }
            };

            const config = configs[type];
            input.placeholder = config.placeholder;
            input.maxLength = config.maxLength;
            hint.textContent = config.hint;

            // Agregar validación en tiempo real
            input.addEventListener('input', (e) => {
                let value = e.target.value;
                
                if (type === 'Cedula' || type === 'RNC') {
                    // Solo números
                    value = value.replace(/\D/g, '');
                } else if (type === 'Pasaporte') {
                    // Solo letras mayúsculas y números
                    value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                }
                
                // Limitar longitud
                if (value.length > config.maxLength) {
                    value = value.substring(0, config.maxLength);
                }
                
                e.target.value = value;
                this.validateField(e.target);
            });
        }

        // Función para validar un campo individual (actualizada)
        validateField(input) {
            const value = input.value.trim();
            const fieldName = input.name || input.id;
            let isValid = true;
            let errorMessage = '';

            // Limpiar errores previos
            this.clearFieldError(input);

            // Validaciones específicas por campo
            switch (fieldName) {
                case 'firstName':
                case 'nombres':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Los nombres son obligatorios';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Debe tener al menos 2 caracteres';
                    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Solo se permiten letras y espacios';
                    }
                    break;

                case 'lastName':
                case 'apellidos':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Los apellidos son obligatorios';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Debe tener al menos 2 caracteres';
                    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Solo se permiten letras y espacios';
                    }
                    break;

                case 'numeroDocumento':
                    const activeButton = document.querySelector('.bimcord-document-type-btn[style*="background-color: rgb(37, 99, 235)"]');
                    const documentType = activeButton ? activeButton.dataset.type : 'Cedula';
                    
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El número de documento es obligatorio';
                    } else {
                        if (documentType === 'Cedula' && !/^\d{11}$/.test(value)) {
                            isValid = false;
                            errorMessage = 'La cédula debe tener 11 dígitos';
                        } else if (documentType === 'RNC' && !/^\d{9}$/.test(value)) {
                            isValid = false;
                            errorMessage = 'El RNC debe tener 9 dígitos';
                        } else if (documentType === 'Pasaporte' && !/^[A-Z0-9]{9}$/.test(value)) {
                            isValid = false;
                            errorMessage = 'El pasaporte debe tener 9 caracteres (letras y números)';
                        }
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
                case 'telefonoCelular':
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

                case 'nacionalidad':
                    const activeDocButton = document.querySelector('.bimcord-document-type-btn[style*="background-color: rgb(37, 99, 235)"]');
                    const docType = activeDocButton ? activeDocButton.dataset.type : 'Cedula';
                    
                    if (docType === 'Pasaporte' && !value) {
                        isValid = false;
                        errorMessage = 'La nacionalidad es obligatoria para pasaportes';
                    }
                    break;

                case 'fechaVencimiento':
                    const activeDocBtn = document.querySelector('.bimcord-document-type-btn[style*="background-color: rgb(37, 99, 235)"]');
                    const docTypeVenc = activeDocBtn ? activeDocBtn.dataset.type : 'Cedula';
                    
                    if (docTypeVenc === 'Pasaporte' && !value) {
                        isValid = false;
                        errorMessage = 'La fecha de vencimiento es obligatoria para pasaportes';
                    } else if (value && new Date(value) <= new Date()) {
                        isValid = false;
                        errorMessage = 'La fecha de vencimiento debe ser futura';
                    }
                    break;
            }

            if (!isValid) {
                this.showFieldError(input, errorMessage);
            }

            return isValid;
        }

        // Función para validar todo el formulario (actualizada)
        validateForm(form) {
            const inputs = form.querySelectorAll('input[required], .bimcord-nationality-input');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            // Validar que se haya seleccionado un tipo de documento
            const activeButton = form.querySelector('.bimcord-document-type-btn[style*="background-color: rgb(37, 99, 235)"]');
            if (!activeButton) {
                isValid = false;
                // Mostrar error en el contenedor de botones
                const buttonContainer = form.querySelector('.bimcord-document-type-buttons');
                this.showFieldError(buttonContainer, 'Debe seleccionar un tipo de documento');
            }

            // Validar archivo (solo si no es edición)
            const filePreview = form.querySelector('.bimcord-file-preview-container');
            const hasFile = filePreview && filePreview.dataset.fileName;
            if (!hasFile) {
                isValid = false;
                this.showFileError('Debe subir una imagen del documento');
            }

            return isValid;
        }

        // Función para verificar si el formulario es válido (actualizada)
        isFormValid(form) {
            const inputs = form.querySelectorAll('input[required], .bimcord-nationality-input');
            
            // Verificar campos requeridos
            for (let input of inputs) {
                const value = input.value.trim();
                if (!value) return false;
                
                // Verificar que no haya errores visibles
                const errorElement = input.parentNode.querySelector('.bimcord-error-message');
                if (errorElement) return false;
            }

            // Verificar tipo de documento seleccionado
            const activeButton = form.querySelector('.bimcord-document-type-btn[style*="background-color: rgb(37, 99, 235)"]');
            if (!activeButton) return false;

            // Verificar archivo subido
            const filePreview = form.querySelector('.bimcord-file-preview-container');
            const hasFile = filePreview && filePreview.dataset.fileName;
            if (!hasFile) return false;
            
            return true;
        }

        // Manejar envío de datos de interés (actualizado)
        handleInterestSubmission(data) {
            // Por ahora solo mostramos los datos en consola
            // Más adelante aquí se implementará el envío al backend
            console.log('Datos de interés enviados:', data);
            
            // Mostrar mensaje de confirmación temporal
            alert(`¡Gracias ${data.nombres}! Hemos recibido tu interés en la unidad ${data.unitNumber}. Nos pondremos en contacto contigo pronto.`);
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