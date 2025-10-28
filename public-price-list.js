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
            -webkit-text-size-adjust: 115%;
            text-size-adjust: 115%;
        `,
        fullScreen: `
            min-height: 100vh;
            background-color: transparent;
     
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
            font-size: clamp(1.6rem, 6vw, 2.25rem);
            line-height: 2.5rem;
            font-weight: 700;
            color: white;
            filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
            margin: 0;
        `,
        projectSubtitle: `
            color: rgba(255, 255, 255, 0.9);
            font-size: clamp(1rem, 3.8vw, 1.125rem);
            line-height: 1.75rem;
            margin: 0;
        `,
        sectionTitle: `
            font-size: clamp(1.2rem, 5vw, 1.5rem);
            line-height: 2rem;
            font-weight: 700;
            color: #111827;
            margin: 0 0 2rem 0;
        `,
        blockCard: `
            background-color: rgba(69,69,69,0.7);
            backdrop-filter: blur(4px);
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            border: 1px solid #44403c;
            
            margin-bottom: 2rem;
        `,
        blockHeader: `
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #44403c;
            padding: 1.5rem;
        `,
        blockHeaderMobile: `
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #44403c;
            padding: 1.5rem;
        `,
        blockTitle: `
            font-size: clamp(0.9rem, 4vw, 1rem);
            line-height: 1.75rem;
            font-weight: 700;
            color: #e7e5e4;
            margin: 0;
        `,
        blockTitleMobile: `
            font-size: clamp(0.85rem, 4.2vw, 1rem);
            line-height: 1rem;
            font-weight: 700;
            color: #e7e5e4;
            margin: 0;
        `,
        blockInfo: `
            display: flex;
            align-items: center;
            gap: 1rem;
        `,
        blockInfoMobile: `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            width: 100%;
        `,
        blockName: `
            font-size: clamp(1rem, 4.5vw, 1.125rem);
            line-height: 1.75rem;
            font-weight: 600;
            color: #e7e5e4;
        `,
        blockCount: `
            font-size: clamp(0.85rem, 3.8vw, 1rem);
            line-height: 1.25rem;
            color: #a8a29e;
        `,
        blockCountMobile: `
            font-size: clamp(0.75rem, 3.8vw, 0.9rem);
            line-height: 1rem;
            color: #a8a29e;
        `,
        // Estilos para acordeón de tablas en cada card
        accordionToggle: `
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 1.75rem;
            border: 1px solid #44403c;
            border-radius: 0.5rem;
            background-color: rgba(0, 0, 0, 0.2);
            color: #e7e5e4;
            font-size: 1.2rem;
            line-height: 1rem;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
            white-space: nowrap;
        `,
        accordionContent: `
            transition: max-height 0.25s ease, opacity 0.25s ease;
            overflow: hidden;
        `,
        tableContainer: `
            overflow: visible;
            position: relative;
            width: 100%;
        `,
        table: `
            min-width: 100%;
            border-collapse: collapse;
            width: 100%;
        `,
        tableHeader: `
            background-color: rgba(0,0,0,0.2);
        `,
        tableHeaderCell: `
            padding: 3rem 0.6rem;
            text-align: center;
            font-size: clamp(1.5rem, 3.8vw, 1.2rem);
            line-height: 1rem;
            font-weight: 700;
            color: #a8a29e;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-bottom: 1px solid #44403c;
            white-space: nowrap;
        `,
        tableBody: `
            background-color: transparent;
        `,
        tableRow: `
            border-bottom: 1px solid #44403c;
            transition: background-color 0.2s ease-in-out;
        `,
        tableCell: `
            padding: 1rem 1.5rem;
            font-size: clamp(2rem, 3.8vw, 1.2rem);
            line-height: 3rem;
            color: #a8a29e;
            white-space: nowrap;
            text-align: center;
            vertical-align: middle;
        `,
        tableCellPrice: `
            padding: 1rem 1.5rem;
            font-size: clamp(2rem, 3.8vw, 1.2rem);
            line-height: 1.25rem;
            font-weight: 600;
            color: #e7e5e4;
            white-space: nowrap;
            text-align: center;
            vertical-align: middle;
        `,
        badge: `
            display: inline-flex;
            align-items: center;
            padding: 0.7rem 1rem;
            border-radius: 9999px;
            font-size: clamp(1.4rem, 3.6vw, 1.1rem);
            line-height: 1rem;
            font-weight: 600;
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
            background-color: rgba(14, 165, 233, 0.8);
            color: white;
            border: none;
            border-radius: 0.375rem;
            padding: 1.375rem 2rem;
            font-size: clamp(1.7rem, 4vw, 1.2rem);
            line-height: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
            white-space: nowrap;
        `,
        interestButtonHover: `
            background-color: rgba(14, 165, 233, 0.9);
        `,
        // Estilos para el modal
        modalOverlay: `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 1rem;
            will-change: backdrop-filter;
        `,
        modalContent: `
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
            width: 100%;
            max-width: 32rem;
            max-height: 90vh;
            overflow-y: auto;
            backdrop-filter: none;
        `,
        modalHeader: `
            padding: 2rem 2rem 1.5rem 2rem;
            position: relative;
        `,
        modalTitle: `
            font-size: clamp(1.4rem, 5.2vw, 1.875rem);
            line-height: 2.25rem;
            font-weight: 700;
            color: #111827;
            margin: 0 0 0.25rem 0;
            font-family: 'Poppins', sans-serif;
        `,
        modalSubtitle: `
            font-size: clamp(1.5rem, 3.8vw, 1.2rem);
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
            font-size: clamp(1rem, 3.8vw, 1.2rem);
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
            font-size: clamp(1rem, 3.8vw, 1.2rem);
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
            font-size: clamp(1rem, 3.8vw, 1.2rem);
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
            font-size: clamp(1rem, 3.8vw, 1.2rem);
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
            font-size: clamp(1rem, 3.8vw, 1.2rem);
            line-height: 1.25rem;
            color: #111827;
            box-sizing: border-box;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
        `,
        formErrorMessage: `
            display: block;
            font-size: clamp(0.95rem, 3.6vw, 1.1rem);
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
            font-size: clamp(1rem, 3.8vw, 1.2rem);
            line-height: 1.25rem;
            opacity: 0.6;
        `,
            documentTypeGroup: `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    `,
    documentTypeButton: `
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        color: #6b7280;
        font-weight: 500;
        border-radius: 0.5rem;
        background-color: white;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        font-family: 'Poppins', sans-serif;
        font-size: clamp(1rem, 3.8vw, 1.2rem);
        line-height: 1.25rem;
        text-align: center;
    `,
    documentTypeButtonActive: `
        padding: 0.5rem 0.75rem;
        border: 1px solid transparent;
        color: white;
        font-weight: 500;
        border-radius: 0.5rem;
        background-color: #2563eb;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        font-family: 'Poppins', sans-serif;
        font-size: clamp(1rem, 3.8vw, 1.2rem);
        line-height: 1.25rem;
        text-align: center;
    `,
    // Estilos para el dropdown de nacionalidades
    nationalityDropdown: `
        position: absolute;
        z-index: 10;
        margin-top: 0.25rem;
        width: 100%;
        background-color: white;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 0.375rem;
        border: 1px solid #e5e7eb;
        max-height: 15rem;
        overflow-y: auto;
    `,
    nationalityOption: `
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
        font-family: 'Poppins', sans-serif;
        font-size: clamp(1rem, 3.8vw, 1.2rem);
        line-height: 1.25rem;
    `,
    nationalityOptionHover: `
        background-color: #f3f4f6;
    `,
    searchIcon: `
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        width: 1.25rem;
        height: 1.25rem;
        pointer-events: none;
    `,
    inputWithIcon: `
        display: block;
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        background-color: #f9fafb;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        font-size: 1.2rem;
        line-height: 1.25rem;
        color: #111827;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;
        font-family: 'Poppins', sans-serif;
    `,
    helpText: `
        margin-top: 0.25rem;
        font-size: clamp(1rem, 3.6vw, 1.1rem);
        line-height: 1rem;
        color: #6b7280;
        font-family: 'Poppins', sans-serif;
    `,
    fileInputContainer: `
            position: relative;
            display: block;
            width: 100%;
            cursor: pointer;
        `,
        fileInputLabel: `
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            background-color: #f9fafb;
            border: 2px dashed #d1d5db;
            border-radius: 0.5rem;
            color: #6b7280;
            font-size: 1.2rem;
            line-height: 1.25rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            font-family: 'Poppins', sans-serif;
            min-height: 3rem;
        `,
        fileInputLabelHover: `
            background-color: #f3f4f6;
            border-color: #2563eb;
            color: #2563eb;
        `,
        fileInputHidden: `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `,
        filePreview: `
            margin-top: 0.5rem;
            padding: 0.5rem;
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 0.375rem;
            font-size: clamp(1rem, 3.8vw, 1.2rem);
            line-height: 1rem;
            color: #0369a1;
            font-family: 'Poppins', sans-serif;
        `,
        uploadIcon: `
            width: 1.25rem;
            height: 1.25rem;
            color: currentColor;
        `,
        headerActions: `
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            z-index: 10;
        `
    };

    const NACIONALIDADES = [
        'Dominicana', 'Estadounidense', 'Española', 'Mexicana', 'Colombiana', 
        'Venezolana', 'Argentina', 'Chilena', 'Peruana', 'Brasileña', 
        'Canadiense', 'Italiana', 'Francesa', 'Alemana', 'Británica',
        'Japonesa', 'China', 'Coreana', 'Rusa', 'Portuguesa', 'Holandesa',
        'Sueca', 'Noruega', 'Danesa', 'Finlandesa', 'Suiza', 'Austriaca',
        'Belga', 'Irlandesa', 'Griega', 'Turca', 'Israelí', 'Egipcia',
        'Marroquí', 'Sudafricana', 'Australiana', 'Neozelandesa'
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
        search: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
        </svg>`,
        upload: `<svg style="${WIDGET_STYLES.uploadIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>`
        ,
        chevronUp: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
        </svg>`,
        chevronDown: `<svg style="${WIDGET_STYLES.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
        </svg>`
        ,
        printer: `<svg style="${WIDGET_STYLES.icon} color: #0ea5e9; margin-top: 0.1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="bi bi-printer">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
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
    function getStatusBadgeStyle(estado) {
        switch (estado) {
            case 'Disponible':
                return "background-color: rgba(34, 197, 94, 0.2); color: #86efac;";
            case 'Vendido':
                return "background-color: rgba(239, 68, 68, 0.2); color: #fca5a5;";
            case 'Reservado':
                return "background-color: rgba(234, 179, 8, 0.2); color: #fde047;";
            default:
                return "background-color: rgba(107, 114, 128, 0.2); color: #e5e7eb;";
        }
    }

    // Auto-escalado de tablas para que quepan en el viewport sin scroll
    function autoScaleTablesToViewport(container) {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const tables = container.querySelectorAll('table');
        tables.forEach(table => {
            // Reset transform para medir tamaño natural
            table.style.transform = 'none';
            table.style.transformOrigin = 'top left';

            const tableRect = table.getBoundingClientRect();
            const parentRect = table.parentElement.getBoundingClientRect();

            const tableHeight = tableRect.height;
            const tableWidth = tableRect.width;

            const availableHeight = Math.max(0, viewportHeight - parentRect.top - 24); // margen inferior
            const availableWidth = parentRect.width; // usamos el ancho del contenedor

            const scaleH = availableHeight / tableHeight;
            const scaleW = availableWidth / tableWidth;
            const scale = Math.min(1, scaleH, scaleW);

            if (scale < 1 && isFinite(scale) && scale > 0) {
                table.style.transform = `scale(${scale})`;
                table.style.transformOrigin = 'top left';
                table.parentElement.style.height = `${tableHeight * scale}px`;
                table.parentElement.style.overflow = 'hidden';
            } else {
                // Revertir si cabe naturalmente
                table.style.transform = 'none';
                table.parentElement.style.height = 'auto';
                table.parentElement.style.overflow = 'visible';
            }
        });
    }

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
                        <div style="${WIDGET_STYLES.headerActions}">
                            <button id="printPriceListButton" type="button" class="bimcord-button-secondary" style="${WIDGET_STYLES.buttonSecondary}"><span style="margin-right:0.5rem;display:inline-flex;align-items:center;justify-content:center;width:1.75rem;height:1.75rem;border-radius:9999px;background-color:rgba(37,99,235,0.12);color:#1d4ed8;">${ICONS.printer}</span>Imprimir Listado (PDF)</button>
                        </div>
                    </div>

                    <!-- Contenido principal -->
                    <div>
                        
                        ${this.getEmptyStateHtml()}
                        ${this.getBlocksHtml()}
                    </div>
                </div>
            `;

            // Agregar event listeners para los botones "Me Interesa"
            this.addEventListeners();

            // Aplicar auto-escalado para que las tablas se vean completas sin scroll
            autoScaleTablesToViewport(this.container);
            window.addEventListener('resize', () => autoScaleTablesToViewport(this.container));
        }

        getBlocksHtml() {
            return this.data.blocks_with_units.map((block, idx) => {
                // Usar directamente las propiedades del bloque desde el JSON
                const blockName = block.nombre || 'Bloque Sin Nombre';
                const blockType = block.tipo || 'Tipo No Especificado';
                const unitsCount = block.units?.length || 0;
                const availableUnitsCount = (block.units || []).filter(u => u.estado === 'Disponible').length;

                const accordionId = `bimcord-accordion-${idx}`;

                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

                const blockNameHtml = blockName !== 'Bloque Sin Nombre' 
                    ? `<span style="${isMobile ? WIDGET_STYLES.blockTitleMobile : WIDGET_STYLES.blockTitle}">
                        ${blockName}
                    </span>`
                    : '';

                const unitsCountHtml = unitsCount > 0 
                    ? `<span style="${isMobile ? WIDGET_STYLES.blockCountMobile : WIDGET_STYLES.blockCount}">${availableUnitsCount}/${unitsCount} Unidades Disponibles</span>`
                    : '';

                const tableHeaders = `
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Nivel</th>
                    <th style="${WIDGET_STYLES.tableHeaderCell}">Área (m²)</th>
                    ${blockType === 'Residencial' ? 
                        `<th style="${WIDGET_STYLES.tableHeaderCell}">EXT (m²)</th>` : 
                        ''}
                    <th style="${WIDGET_STYLES.tableHeaderCell}">PARK</th>
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
                        <div style="${isMobile ? WIDGET_STYLES.blockHeaderMobile : WIDGET_STYLES.blockHeader}">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <h3 style="${isMobile ? WIDGET_STYLES.blockTitleMobile : WIDGET_STYLES.blockTitle}">${blockName} (${blockType})</h3>
                            </div>
                            <div style="${isMobile ? WIDGET_STYLES.blockInfoMobile : WIDGET_STYLES.blockInfo}">
                                ${unitsCountHtml}
                                <button 
                                    class="bimcord-accordion-toggle"
                                    style="${WIDGET_STYLES.accordionToggle}"
                                    data-target="${accordionId}"
                                    aria-expanded="${idx === 0 ? 'true' : 'false'}"
                                    onmouseover="this.style.backgroundColor='rgba(255,255,255,0.06)'; this.style.borderColor='#6b7280';"
                                    onmouseout="this.style.backgroundColor='rgba(0,0,0,0.2)'; this.style.borderColor='#44403c';"
                                >
                                    ${ICONS.chevronUp}
                                </button>
                            </div>
                        </div>
                        
                        <div id="${accordionId}" class="bimcord-accordion-content" style="${WIDGET_STYLES.accordionContent}${idx === 0 ? ' max-height: 60vh; opacity: 1; overflow-y: auto;' : ' max-height: 0; opacity: 0; overflow: hidden;'}">
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
                    </div>
                `;
            }).join('');
        }

        getUnitRowHtml(unit, blockType) {
            const balconCell = blockType === 'Residencial' 
                ? `<td style="${WIDGET_STYLES.tableCell}">${unit.m2_balcon_from_block || '-'}</td>`
                : '';

            return `
                <tr style="${WIDGET_STYLES.tableRow}" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'" onmouseout="this.style.backgroundColor='transparent'">
                    <td style="${WIDGET_STYLES.tableCell}">${unit.numero}</td>
                    <td style="${WIDGET_STYLES.tableCell}">${unit.area}</td>
                    ${balconCell}
                    <td style="${WIDGET_STYLES.tableCell}">${unit.parqueos_from_block || '-'} </td>
                    <td style="${WIDGET_STYLES.tableCellPrice}">${unit.estado === 'Disponible' ? formatCurrency(unit.precio, 'USD') : '-'}</td>
                    <td style="${WIDGET_STYLES.tableCell}">
                        <span style="${WIDGET_STYLES.badge}; ${getStatusBadgeStyle(unit.estado)}">${unit.estado}</span>
                    </td>
                    <td style="${WIDGET_STYLES.tableCell}">
                        <button 
                            class="bimcord-interest-button" 
                            style="${WIDGET_STYLES.interestButton}"
                            data-unit-id="${unit.id}"
                            data-unit-number="${unit.numero}"
                            data-unit-price="${unit.precio}"
                            data-unit-area="${unit.area}">
                            Me Interesa
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

            // Inicializar acordeones: solo el primero expandido con scroll, otros colapsados
            const accordionToggles = this.container.querySelectorAll('.bimcord-accordion-toggle');
            accordionToggles.forEach(toggle => {
                const targetId = toggle.getAttribute('data-target');
                const content = this.container.querySelector(`#${targetId}`);
                if (!content) return;

                // Establecer estado inicial: primero expandido con scroll (60vh), otros colapsados
                if (toggle.getAttribute('aria-expanded') === 'true') {
                    content.style.maxHeight = '60vh';
                    content.style.opacity = '1';
                    content.style.overflowY = 'auto';
                    toggle.innerHTML = `${ICONS.chevronUp}`;
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    content.style.overflowY = 'hidden';
                    toggle.innerHTML = `${ICONS.chevronDown}`;
                }

                toggle.addEventListener('click', () => {
                    const expanded = toggle.getAttribute('aria-expanded') === 'true';
                    if (expanded) {
                        // Colapsar
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                        content.style.overflowY = 'hidden';
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.innerHTML = `${ICONS.chevronDown}`;
                        // Recalcular escalado tras colapsar por si cambió el layout
                        requestAnimationFrame(() => autoScaleTablesToViewport(this.container));
                    } else {
                        // Expandir
                        content.style.maxHeight = '60vh';
                        content.style.opacity = '1';
                        content.style.overflowY = 'auto';
                        toggle.setAttribute('aria-expanded', 'true');
                        toggle.innerHTML = `${ICONS.chevronUp}`;
                        // Recalcular escalado para las tablas visibles del acordeón
                        requestAnimationFrame(() => autoScaleTablesToViewport(this.container));
                    }
                });
            });

            // Ajustar altura del acordeón en redimensionamiento cuando esté expandido
            window.addEventListener('resize', () => {
                const contents = this.container.querySelectorAll('.bimcord-accordion-content');
                contents.forEach(content => {
                    const toggle = this.container.querySelector(`.bimcord-accordion-toggle[data-target="${content.id}"]`);
                    if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
                        // Mantener una altura fija con scroll cuando esté expandido
                        content.style.maxHeight = '60vh';
                        content.style.overflowY = 'auto';
                    }
                });
            });

            // Botón de imprimir listado (PDF vía impresión del navegador)
            const printButton = this.container.querySelector('#printPriceListButton');
            if (printButton) {
                printButton.addEventListener('click', () => this.printListingAsPDF());
            }
        }

        // Genera HTML simple en blanco y negro para imprimir el listado actual
        generatePrintableHTML() {
            const project = this.data?.proyecto_detail || {};
            const blocks = this.data?.blocks_with_units || [];
            const now = new Date();
            const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

            const styles = `
                <style>
                    @page { size: A4; margin: 16mm 12mm; }
                    body { font-family: Helvetica, Arial, sans-serif; color: #000; background: #fff; }
                    h1 { font-size: 20px; margin: 0 0 6px 0; }
                    h2 { font-size: 14px; margin: 12px 0 6px 0; }
                    .meta { font-size: 11px; margin-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
                    th, td { border: 1px solid #000; padding: 6px 8px; font-size: 11px; text-align: center; }
                    th { font-weight: 700; }
                    .block-header { display: flex; justify-content: space-between; font-size: 12px; margin: 8px 0; }
                    .muted { font-size: 11px; }
                    .status-badge { display: inline-flex; align-items: center; justify-content: center; padding: 2px 8px; border-radius: 9999px; font-weight: 600; font-size: 11px; }
                    .status-disponible { color: #22c55e !important; background-color: #ceffe0 !important; }
                </style>
            `;

            const header = `
                <h1>LISTADO DE PRECIOS - ${project.nombre || 'Proyecto'}</h1>
                <div class="meta">Emitido: ${dateStr}</div>
            `;

            const blockSections = blocks.map(block => {
                const blockName = block.nombre || 'Bloque';
                const blockType = block.tipo || 'Tipo';
                const units = block.units || [];
                const availableUnitsCount = units.filter(u => u.estado === 'Disponible').length;
                const unitsCount = units.length;

                const hasExt = blockType === 'Residencial';

                const headers = `
                    <tr>
                        <th>Unidad</th>
                        <th>Área (m²)</th>
                        ${hasExt ? '<th>EXT (m²)</th>' : ''}
                        <th>Park</th>
                        <th>Precio (USD)</th>
                        <th>Estado</th>
                    </tr>
                `;

                const rows = units.length > 0 ? units.map(u => `
                    <tr>
                        <td>${u.numero ?? '-'}</td>
                        <td>${u.area ?? '-'}</td>
                        ${hasExt ? `<td>${u.m2_balcon_from_block ?? '-'}</td>` : ''}
                        <td>${u.parqueos_from_block ?? '-'}</td>
                        <td>${u.estado === 'Disponible' ? formatCurrency(u.precio, 'USD') : '-'}</td>
                        <td><span class="status-badge ${u.estado === 'Disponible' ? 'status-disponible' : ''}" style="${getStatusBadgeStyle(u.estado)}">${u.estado ?? '-'}</span></td>
                    </tr>
                `).join('') : `
                    <tr>
                        <td colspan="${hasExt ? 6 : 5}">No hay unidades disponibles en este bloque</td>
                    </tr>
                `;

                return `
                    <div class="block">
                        <div class="block-header"><div><strong>${blockName}</strong> (${blockType})</div><div class="muted">${availableUnitsCount}/${unitsCount} disponibles</div></div>
                        <table>
                            <thead>${headers}</thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                `;
            }).join('');

            return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/>${styles}<title>Listado de Precios</title></head><body>${header}${blockSections}</body></html>`;
        }

        // Descarga directa del HTML del listado (sin abrir diálogo de impresión)
        printListingAsPDF() {
            try {
                const printable = this.generatePrintableHTML();
                const blob = new Blob([printable], { type: 'text/html;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const now = new Date();
                const ts = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}-${String(now.getMinutes()).padStart(2,'0')}`;
                a.href = url;
                a.download = `listado-precios_${ts}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(url), 500);
            } catch (err) {
                console.error('Error al preparar descarga:', err);
                alert('Ocurrió un error al preparar la descarga del listado.');
            }
        }

        showInterestModal(unit) {
            // Crear el modal
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'bimcord-modal-overlay public-price-list-modal-overlay';
            modalOverlay.style.cssText = WIDGET_STYLES.modalOverlay;

            const modalContent = document.createElement('div');
            modalContent.className = 'bimcord-modal-content public-price-list-modal-content';
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
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="${WIDGET_STYLES.formGroup}">
                                <label style="${WIDGET_STYLES.formLabel}" for="firstName">
                                    Nombres <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName" 
                                    required
                                    class="bimcord-form-input"
                                    style="${WIDGET_STYLES.formInput}"
                                    placeholder="Ej: Juan Carlos">
                            </div>
                            
                            <div style="${WIDGET_STYLES.formGroup}">
                                <label style="${WIDGET_STYLES.formLabel}" for="lastName">
                                    Apellidos <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName" 
                                    required
                                    class="bimcord-form-input"
                                    style="${WIDGET_STYLES.formInput}"
                                    placeholder="Ej: Pérez Gómez">
                            </div>
                        </div>

                        <!-- Tipo de Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}">
                                Tipo de Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <div style="${WIDGET_STYLES.documentTypeGroup}">
                                <button type="button" class="document-type-btn" data-type="Cedula" style="${WIDGET_STYLES.documentTypeButtonActive}">
                                    Cédula
                                </button>
                                <button type="button" class="document-type-btn" data-type="RNC" style="${WIDGET_STYLES.documentTypeButton}">
                                    RNC
                                </button>
                                <button type="button" class="document-type-btn" data-type="Pasaporte" style="${WIDGET_STYLES.documentTypeButton}">
                                    Pasaporte
                                </button>
                            </div>
                            <input type="hidden" id="documentType" name="documentType" value="Cedula" required>
                        </div>

                        <!-- Número de Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="documentNumber">
                                Número de Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="documentNumber" 
                                name="documentNumber" 
                                required
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                placeholder="00112345678"
                                maxlength="11">
                            <div style="${WIDGET_STYLES.helpText}" class="document-help">
                                11 dígitos sin guiones
                            </div>
                        </div>

                        <!-- Subir Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="documentFile">
                                Subir Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                            </label>
                            <div style="${WIDGET_STYLES.fileInputContainer}">
                                <input 
                                    type="file" 
                                    id="documentFile" 
                                    name="documentFile" 
                                    required
                                    accept="image/*,.pdf"
                                    class="bimcord-file-input"
                                    style="${WIDGET_STYLES.fileInputHidden}">
                                <label 
                                    for="documentFile" 
                                    class="bimcord-file-label"
                                    style="${WIDGET_STYLES.fileInputLabel}">
                                    ${ICONS.upload}
                                    <span class="file-label-text">Seleccionar archivo (imagen o PDF)</span>
                                </label>
                                <div class="file-preview" style="display: none;"></div>
                            </div>
                            <div style="${WIDGET_STYLES.helpText}">
                                Formatos permitidos: JPG, PNG, PDF. Tamaño máximo: 5MB
                            </div>
                        </div>

                        <!-- Nacionalidad -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="nationality">
                                Nacionalidad <span class="nationality-required" style="${WIDGET_STYLES.requiredAsterisk}; display: none;">*</span>
                            </label>
                            <div style="position: relative;">
                                <div style="${WIDGET_STYLES.searchIcon}">
                                    ${ICONS.search}
                                </div>
                                <input 
                                    type="text" 
                                    id="nationality" 
                                    name="nationality" 
                                    class="bimcord-form-input"
                                    style="${WIDGET_STYLES.inputWithIcon}"
                                    placeholder="Buscar nacionalidad..."
                                    autocomplete="off">
                                <div class="nationality-dropdown" style="${WIDGET_STYLES.nationalityDropdown}; display: none;">
                                    <!-- Las opciones se generarán dinámicamente -->
                                </div>
                            </div>
                        </div>

                        <!-- Fecha de Vencimiento del Documento -->
                        <div style="${WIDGET_STYLES.formGroup}">
                            <label style="${WIDGET_STYLES.formLabel}" for="documentExpiry">
                                Fecha de Vencimiento del Documento <span class="expiry-required" style="${WIDGET_STYLES.requiredAsterisk}; display: none;">*</span>
                            </label>
                            <input 
                                type="date" 
                                id="documentExpiry" 
                                name="documentExpiry" 
                                class="bimcord-form-input"
                                style="${WIDGET_STYLES.formInput}"
                                min="${new Date().toISOString().split('T')[0]}">
                        </div>

                        <!-- Email y Teléfono -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div style="${WIDGET_STYLES.formGroup}">
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
                            
                            <div style="${WIDGET_STYLES.formGroup}">
                                <label style="${WIDGET_STYLES.formLabel}" for="phone">
                                    Teléfono Celular <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    required
                                    class="bimcord-form-input"
                                    style="${WIDGET_STYLES.formInput}"
                                    placeholder="+1 (809) 555-1234">
                            </div>
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

            // Función para cerrar el modal
            const closeModal = () => {
                if (modalOverlay && modalOverlay.parentNode) {
                    modalOverlay.remove();
                }
                this.currentModal = null;
            };

            // Event listeners para cerrar el modal
            if (closeButton) {
                closeButton.addEventListener('click', closeModal);
            }
            
            if (cancelButton) {
                cancelButton.addEventListener('click', closeModal);
            }

            // Cerrar modal al hacer click en el overlay
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            // Cerrar modal con la tecla Escape
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);

            // Inicializar funcionalidad de tipo de documento
            this.initDocumentTypeHandlers(modalOverlay);
            
            // Inicializar funcionalidad de nacionalidad
            this.initNationalityHandlers(modalOverlay);

            // Inicializar funcionalidad de archivo
            this.initFileUploadHandlers(modalOverlay);

            // Inicializar validación
            this.initFormValidation(form, submitButton);

            // ... existing code for close handlers ...

            // Manejar envío del formulario
            // Manejar envío del formulario
            const handleSubmit = async (e) => {
                e.preventDefault();
                
                // Validar formulario antes de enviar
                if (!this.validateForm(form)) {
                    return;
                }
                
                const formData = new FormData(form);
                const documentFile = formData.get('documentFile');

                const data = {
                    unitId: unit.id,
                    unitNumber: unit.numero,
                    unitPrice: unit.precio,
                    unitArea: unit.area,
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    documentType: formData.get('documentType'),
                    documentNumber: formData.get('documentNumber'),
                    nationality: formData.get('nationality'),
                    documentExpiry: formData.get('documentExpiry'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    documentFile: documentFile ? {
                        name: documentFile.name,
                        size: documentFile.size,
                        type: documentFile.type
                    } : null
                };

                // Intentar enviar los datos
                try {
                    await this.handleInterestSubmission(data, formData);
                    // Solo cerrar el modal si el envío fue exitoso
                    closeModal();
                } catch (error) {
                    // El error ya se maneja en handleInterestSubmission
                    // No cerrar el modal para permitir reintento
                }
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

                // Nueva función para manejar la subida de archivos
        initFileUploadHandlers(modalOverlay) {
            const fileInput = modalOverlay.querySelector('#documentFile');
            const fileLabel = modalOverlay.querySelector('.bimcord-file-label');
            const fileLabelText = modalOverlay.querySelector('.file-label-text');
            const filePreview = modalOverlay.querySelector('.file-preview');

            if (!fileInput || !fileLabel || !fileLabelText || !filePreview) {
                console.warn('Elementos de archivo no encontrados');
                return;
            }

            // Agregar estilos hover al label
            fileLabel.addEventListener('mouseenter', () => {
                fileLabel.style.cssText = WIDGET_STYLES.fileInputLabel + '; ' + WIDGET_STYLES.fileInputLabelHover;
            });

            fileLabel.addEventListener('mouseleave', () => {
                fileLabel.style.cssText = WIDGET_STYLES.fileInputLabel;
            });

            // Manejar cambio de archivo
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                
                if (file) {
                    // Validar tamaño del archivo (5MB máximo)
                    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
                    if (file.size > maxSize) {
                        this.showFieldError(fileInput, 'El archivo es demasiado grande. Máximo 5MB.');
                        fileInput.value = '';
                        return;
                    }

                    // Validar tipo de archivo
                    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                    if (!allowedTypes.includes(file.type)) {
                        this.showFieldError(fileInput, 'Tipo de archivo no permitido. Use JPG, PNG o PDF.');
                        fileInput.value = '';
                        return;
                    }

                    // Mostrar preview del archivo
                    fileLabelText.textContent = `Archivo seleccionado: ${file.name}`;
                    filePreview.style.cssText = WIDGET_STYLES.filePreview;
                    filePreview.style.display = 'block';
                    filePreview.innerHTML = `
                        <strong>Archivo:</strong> ${file.name}<br>
                        <strong>Tamaño:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB<br>
                        <strong>Tipo:</strong> ${file.type}
                    `;

                    // Limpiar errores
                    this.clearFieldError(fileInput);

                    // Revalidar el formulario
                    const form = modalOverlay.querySelector('.bimcord-interest-form');
                    const submitButton = modalOverlay.querySelector('.bimcord-submit-button');
                    this.updateSubmitButton(submitButton, this.isFormValid(form));
                } else {
                    // Resetear si no hay archivo
                    fileLabelText.textContent = 'Seleccionar archivo (imagen o PDF)';
                    filePreview.style.display = 'none';
                }
            });
        }



        initDocumentTypeHandlers(modalOverlay) {
            const documentButtons = modalOverlay.querySelectorAll('.document-type-btn');
            const documentTypeInput = modalOverlay.querySelector('#documentType');
            const documentNumberInput = modalOverlay.querySelector('#documentNumber');
            const helpText = modalOverlay.querySelector('.document-help');
            const nationalityRequired = modalOverlay.querySelector('.nationality-required');
            const expiryRequired = modalOverlay.querySelector('.expiry-required');
            const nationalityInput = modalOverlay.querySelector('#nationality');
            const expiryInput = modalOverlay.querySelector('#documentExpiry');

            documentButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const documentType = button.dataset.type;
                    
                    // Actualizar botones activos
                    documentButtons.forEach(btn => {
                        btn.style.cssText = WIDGET_STYLES.documentTypeButton;
                    });
                    button.style.cssText = WIDGET_STYLES.documentTypeButtonActive;
                    
                    // Actualizar valor del input hidden
                    documentTypeInput.value = documentType;
                    
                    // Actualizar configuración del campo número de documento
                    const config = DOCUMENT_CONFIG[documentType];
                    if (config) {
                        documentNumberInput.placeholder = config.placeholder;
                        documentNumberInput.maxLength = config.maxLength;
                        helpText.textContent = config.description;
                    }
                    
                    // Mostrar/ocultar campos requeridos según el tipo de documento
                    if (documentType === 'Pasaporte') {
                        nationalityRequired.style.display = 'inline';
                        expiryRequired.style.display = 'inline';
                        nationalityInput.required = true;
                        expiryInput.required = true;
                    } else {
                        nationalityRequired.style.display = 'none';
                        expiryRequired.style.display = 'none';
                        nationalityInput.required = false;
                        expiryInput.required = false;
                        nationalityInput.value = '';
                        expiryInput.value = '';
                    }
                    
                    // Limpiar errores del campo número de documento
                    this.clearFieldError(documentNumberInput);
                    
                    // Revalidar el formulario
                    const form = modalOverlay.querySelector('.bimcord-interest-form');
                    const submitButton = modalOverlay.querySelector('.bimcord-submit-button');
                    this.updateSubmitButton(submitButton, this.isFormValid(form));
                });
            });
        }

        // Nueva función para manejar el dropdown de nacionalidades
        initNationalityHandlers(modalOverlay) {
            const nationalityInput = modalOverlay.querySelector('#nationality');
            const dropdown = modalOverlay.querySelector('.nationality-dropdown');
            
            if (!nationalityInput || !dropdown) {
                console.warn('Elementos de nacionalidad no encontrados');
                return;
            }
            
            let filteredNationalities = [...NACIONALIDADES];
            
            // Función para renderizar opciones
            const renderOptions = (nationalities) => {
                dropdown.innerHTML = '';
                
                if (nationalities.length === 0) {
                    dropdown.innerHTML = `
                        <div style="${WIDGET_STYLES.nationalityOption}; color: #6b7280;">
                            No se encontraron resultados
                        </div>
                    `;
                } else {
                    nationalities.forEach(nationality => {
                        const option = document.createElement('div');
                        option.style.cssText = WIDGET_STYLES.nationalityOption;
                        option.textContent = nationality;
                        option.addEventListener('click', () => {
                            nationalityInput.value = nationality;
                            dropdown.style.display = 'none';
                            this.clearFieldError(nationalityInput);
                            
                            // Revalidar el formulario
                            const form = modalOverlay.querySelector('.bimcord-interest-form');
                            const submitButton = modalOverlay.querySelector('.bimcord-submit-button');
                            this.updateSubmitButton(submitButton, this.isFormValid(form));
                        });
                        option.addEventListener('mouseenter', () => {
                            option.style.backgroundColor = '#f3f4f6';
                        });
                        option.addEventListener('mouseleave', () => {
                            option.style.backgroundColor = 'transparent';
                        });
                        dropdown.appendChild(option);
                    });
                }
            };
            
            // Mostrar dropdown al hacer focus
            nationalityInput.addEventListener('focus', () => {
                renderOptions(filteredNationalities);
                dropdown.style.display = 'block';
            });
            
            // Filtrar mientras se escribe
            nationalityInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filteredNationalities = NACIONALIDADES.filter(nationality =>
                    nationality.toLowerCase().includes(searchTerm)
                );
                renderOptions(filteredNationalities);
                dropdown.style.display = 'block';
            });
            
            // Ocultar dropdown al hacer click fuera
            const hideDropdown = (e) => {
                if (!nationalityInput.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            };
            
            document.addEventListener('click', hideDropdown);
            
            // Limpiar el event listener cuando se cierre el modal
            modalOverlay.addEventListener('remove', () => {
                document.removeEventListener('click', hideDropdown);
            });
        }

        // Actualizar función de validación de campos
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

                case 'documentNumber':
                    const documentType = document.querySelector('#documentType').value;
                    const config = DOCUMENT_CONFIG[documentType];
                    
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El número de documento es obligatorio';
                    } else if (!config.pattern.test(value)) {
                        isValid = false;
                        errorMessage = `Formato inválido. ${config.description}`;
                    }
                    break;

                case 'nationality':
                    const isPassport = document.querySelector('#documentType').value === 'Pasaporte';
                    if (isPassport && !value) {
                        isValid = false;
                        errorMessage = 'La nacionalidad es requerida para pasaportes';
                    }
                    break;

                case 'documentExpiry':
                    const isPassportExpiry = document.querySelector('#documentType').value === 'Pasaporte';
                    if (isPassportExpiry && !value) {
                        isValid = false;
                        errorMessage = 'La fecha de vencimiento es requerida para pasaportes';
                    } else if (value && new Date(value) <= new Date()) {
                        isValid = false;
                        errorMessage = 'La fecha debe ser futura';
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
                if (input.type === 'file') {
                    if (!input.files || input.files.length === 0) return false;
                } else {
                    const value = input.value.trim();
                    if (!value) return false;
                }
                
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

        async handleInterestSubmission(data, formData) {
            if (!this.config.apiBaseUrl) {
                console.error('API Base URL no configurada');
                alert('Error: Configuración de API no encontrada');
                return;
            }

            // Mostrar estado de carga en el botón
            const submitButton = document.querySelector('.bimcord-submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            submitButton.style.cssText = WIDGET_STYLES.buttonDisabled;

            try {
                // Preparar los datos para enviar a la API
                const apiData = new FormData();
                
                // Agregar todos los campos del formulario
                for (let [key, value] of formData.entries()) {
                    apiData.append(key, value);
                }
                
                // Agregar información adicional de la unidad
                apiData.append('unitId', data.unitId);
                apiData.append('unitNumber', data.unitNumber);
                apiData.append('unitPrice', data.unitPrice);
                apiData.append('unitArea', data.unitArea);
                apiData.append('projectId', this.config.projectId);

                // Realizar la petición a la API
                const response = await fetch(`${this.config.apiBaseUrl}/api/auth/public-client-interest/`, {
                    method: 'POST',
                    body: apiData,
                    // No establecer Content-Type para FormData, el navegador lo hace automáticamente
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                
                // Console.log para debugging (opcional, puedes removerlo en producción)
                console.log('Respuesta de la API:', result);
                
                // Mostrar mensaje de éxito
                alert(`¡Gracias ${data.firstName}! Hemos recibido tu interés en la unidad ${data.unitNumber}. Nos pondremos en contacto contigo pronto.`);
                
            } catch (error) {
                console.error('Error al enviar datos a la API:', error);
                
                // Mostrar mensaje de error al usuario
                alert(`Error al enviar la información: ${error.message}. Por favor, inténtalo nuevamente.`);
                
                // Restaurar el botón para permitir reintento
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.cssText = WIDGET_STYLES.buttonPrimary;
                
                return; // Salir sin cerrar el modal para permitir reintento
            }
            
            // Restaurar el botón (solo si fue exitoso)
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.cssText = WIDGET_STYLES.buttonPrimary;
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