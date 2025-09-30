(function() {
    // Global object for the widget
    window.PublicPriceList = {
        init: function(containerId, options) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`PublicPriceList: Container with ID '${containerId}' not found.`);
                return;
            }

            const projectId = options.projectId;
            const apiBaseUrl = options.apiBaseUrl || 'https://bimcord-backend-python-production.up.railway.app'; // Fallback a tu URL de producción
            const embedded = options.embedded || false;

            if (!projectId) {
                container.innerHTML = '<div class="ppl-error">Error: Project ID is required.</div>';
                console.error('PublicPriceList: Project ID is required in options.');
                return;
            }

            container.classList.add('ppl-container');
            if (embedded) {
                container.classList.add('ppl-embedded');
            }

            // --- Helper Functions ---

            const showLoading = (message = 'Cargando...') => {
                container.innerHTML = `<div class="ppl-loading">${message}</div>`;
            };

            const showError = (message) => {
                container.innerHTML = `<div class="ppl-error">${message}</div>`;
            };

            const formatCurrency = (amount, currency = 'USD') => {
                if (amount === undefined || amount === null) return 'N/A';
                const numAmount = parseFloat(amount);
                if (isNaN(numAmount)) return 'N/A';
                return new Intl.NumberFormat('es-DO', {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2,
                }).format(numAmount);
            };

            const formatDate = (dateString) => {
                if (!dateString) return '';
                try {
                    const date = new Date(dateString);
                    return date.toISOString().split('T')[0]; // YYYY-MM-DD
                } catch (e) {
                    return dateString;
                }
            };

            // --- ICONS (assuming these are defined elsewhere or inlined) ---
            const ICONS = {
                close: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
                upload: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
                search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
                fileText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
                image: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'
            };

            // --- WIDGET_STYLES (assuming these are defined elsewhere or inlined) ---
            // These styles should ideally come from your public-price-list.css
            // For now, we'll use a simplified version or assume they are handled by the CSS file.
            const WIDGET_STYLES = {
                modalOverlay: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; box-sizing: border-box;',
                modalContent: 'background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); max-width: 500px; width: 90%; position: relative; max-height: 90vh; overflow-y: auto; box-sizing: border-box;',
                modalHeader: 'margin-bottom: 20px; text-align: center;',
                modalTitle: 'font-size: 1.5em; font-weight: 700; color: #031c8b; margin-top: 0; margin-bottom: 5px;',
                modalSubtitle: 'font-size: 1em; color: #4b5563; margin-bottom: 15px;',
                closeButton: 'position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.8em; cursor: pointer; color: #4b5563; transition: color 0.2s ease;',
                modalBody: 'padding-bottom: 20px;',
                modalFooter: 'display: flex; justify-content: flex-end; gap: 10px; padding-top: 20px; border-top: 1px solid #e5e7eb;',
                formGroup: 'display: flex; flex-direction: column; margin-bottom: 15px;',
                formLabel: 'font-size: 0.9em; font-weight: 500; margin-bottom: 5px; color: #1f2937;',
                requiredAsterisk: 'color: #ef4444;',
                formInput: 'padding: 10px; border: 1px solid #e5e7eb; border-radius: 5px; font-size: 1em; width: 100%; box-sizing: border-box;',
                documentTypeGroup: 'display: flex; gap: 10px; margin-bottom: 10px;',
                documentTypeButton: 'flex: 1; padding: 10px; border: 1px solid #e5e7eb; border-radius: 5px; background-color: #f9fafb; cursor: pointer; transition: all 0.2s ease; font-size: 0.9em;',
                documentTypeButtonActive: 'flex: 1; padding: 10px; border: 1px solid #031c8b; border-radius: 5px; background-color: #031c8b; color: white; cursor: pointer; font-size: 0.9em;',
                helpText: 'font-size: 0.8em; color: #6b7280; margin-top: 5px;',
                fileInputContainer: 'border: 2px dashed #e5e7eb; border-radius: 5px; padding: 20px; text-align: center; cursor: pointer;',
                fileInputHidden: 'display: none;',
                fileInputLabel: 'display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; color: #4b5563;',
                searchIcon: 'position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #9ca3af;',
                inputWithIcon: 'padding-left: 35px; padding-right: 10px; padding-top: 10px; padding-bottom: 10px; border: 1px solid #e5e7eb; border-radius: 5px; font-size: 1em; width: 100%; box-sizing: border-box;',
                nationalityDropdown: 'position: absolute; top: 100%; left: 0; right: 0; background-color: white; border: 1px solid #e5e7eb; border-radius: 5px; max-height: 150px; overflow-y: auto; z-index: 100; box-shadow: 0 2px 5px rgba(0,0,0,0.1);',
                buttonPrimary: 'background-color: #031c8b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1em; font-weight: 600; transition: background-color 0.2s ease;',
                buttonSecondary: 'background-color: #f9fafb; color: #1f2937; border: 1px solid #e5e7eb; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1em; font-weight: 600; transition: background-color 0.2s ease;',
            };


            // --- Form Rendering and Submission Logic ---

            const showInterestModal = (unit) => {
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
                            <!-- Hidden fields for unit and project data -->
                            <input type="hidden" name="unitId" value="${unit.id}" />
                            <input type="hidden" name="unitNumber" value="${unit.numero}" />
                            <input type="hidden" name="unitPrice" value="${unit.precio}" />
                            <input type="hidden" name="unitArea" value="${unit.area}" />
                            <input type="hidden" name="projectId" value="${projectId}" />

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
                                <div class="document-type-selector" style="${WIDGET_STYLES.documentTypeGroup}">
                                    <button type="button" class="document-type-btn active" data-type="Cedula" style="${WIDGET_STYLES.documentTypeButtonActive}">
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
                                <div style="${WIDGET_STYLES.helpText}" class="document-help-text">
                                    11 dígitos sin guiones
                                </div>
                            </div>

                            <!-- Subir Documento -->
                            <div style="${WIDGET_STYLES.formGroup}">
                                <label style="${WIDGET_STYLES.formLabel}" for="documentFile">
                                    Subir Documento <span style="${WIDGET_STYLES.requiredAsterisk}">*</span>
                                </label>
                                <div class="bimcord-file-upload-container" style="${WIDGET_STYLES.fileInputContainer}">
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
                            <div class="bimcord-form-message" style="margin-top: 15px;"></div>
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
                            form="bimcord-interest-form"
                            class="bimcord-submit-button bimcord-button-primary"
                            style="${WIDGET_STYLES.buttonPrimary}">
                            Enviar Información
                        </button>
                    </div>
                `;
                container.appendChild(modalOverlay);
                modalOverlay.appendChild(modalContent);

                const form = modalContent.querySelector('.bimcord-interest-form');
                const closeButton = modalContent.querySelector('.bimcord-close-button');
                const cancelButton = modalContent.querySelector('.bimcord-cancel-button');
                const submitButton = modalContent.querySelector('.bimcord-submit-button');
                const formMessageDiv = modalContent.querySelector('.bimcord-form-message');

                const documentTypeInput = modalContent.querySelector('#documentType');
                const documentNumberInput = modalContent.querySelector('#documentNumber');
                const documentHelpText = modalContent.querySelector('.document-help-text');
                const nationalityInput = modalContent.querySelector('#nationality');
                const nationalityDropdown = modalContent.querySelector('.nationality-dropdown');
                const nationalityRequired = modalContent.querySelector('.nationality-required');
                const documentExpiryInput = modalContent.querySelector('#documentExpiry');
                const expiryRequired = modalContent.querySelector('.expiry-required');
                const documentFileInput = modalContent.querySelector('#documentFile');
                const fileLabelText = modalContent.querySelector('.file-label-text');
                const filePreviewDiv = modalContent.querySelector('.file-preview');

                const documentConfig = {
                    Cedula: { maxLength: 11, pattern: /^\d{11}$/, placeholder: '00112345678', help: '11 dígitos sin guiones' },
                    RNC: { maxLength: 9, pattern: /^\d{9}$/, placeholder: '123456789', help: '9 dígitos' },
                    Pasaporte: { maxLength: 9, pattern: /^[A-Z0-9]{9}$/, placeholder: 'A12345678', help: '9 caracteres (letras y números)' }
                };
                const allNationalities = [
                    'Dominicana', 'Estadounidense', 'Española', 'Mexicana', 'Colombiana', 
                    'Venezolana', 'Argentina', 'Chilena', 'Peruana', 'Brasileña', 
                    'Canadiense', 'Italiana', 'Francesa', 'Alemana', 'Británica'
                ];

                let currentDocumentType = 'Cedula';

                const updateDocumentTypeUI = (type) => {
                    currentDocumentType = type;
                    documentTypeInput.value = type;
                    documentNumberInput.value = ''; // Clear number when type changes
                    documentNumberInput.maxLength = documentConfig[type].maxLength;
                    documentNumberInput.placeholder = documentConfig[type].placeholder;
                    documentHelpText.textContent = documentConfig[type].help;

                    // Update active button style
                    modalContent.querySelectorAll('.document-type-btn').forEach(btn => {
                        if (btn.dataset.type === type) {
                            btn.style.cssText = WIDGET_STYLES.documentTypeButtonActive;
                            btn.classList.add('active');
                        } else {
                            btn.style.cssText = WIDGET_STYLES.documentTypeButton;
                            btn.classList.remove('active');
                        }
                    });

                    // Show/hide required for nationality/expiry
                    if (type === 'Pasaporte') {
                        nationalityRequired.style.display = 'inline';
                        expiryRequired.style.display = 'inline';
                        nationalityInput.required = true;
                        documentExpiryInput.required = true;
                    } else {
                        nationalityRequired.style.display = 'none';
                        expiryRequired.style.display = 'none';
                        nationalityInput.required = false;
                        documentExpiryInput.required = false;
                    }
                };

                // Initial UI setup for document type
                updateDocumentTypeUI('Cedula');

                // Event listeners for document type buttons
                modalContent.querySelectorAll('.document-type-btn').forEach(btn => {
                    btn.addEventListener('click', () => updateDocumentTypeUI(btn.dataset.type));
                });

                // Document number input formatting
                documentNumberInput.addEventListener('input', (e) => {
                    let value = e.target.value;
                    if (currentDocumentType === 'Cedula' || currentDocumentType === 'RNC') {
                        value = value.replace(/\D/g, ''); // Only digits
                    } else if (currentDocumentType === 'Pasaporte') {
                        value = value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Alphanumeric uppercase
                    }
                    e.target.value = value.substring(0, documentConfig[currentDocumentType].maxLength);
                });

                // Nationality search and dropdown
                nationalityInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filtered = allNationalities.filter(n => n.toLowerCase().includes(searchTerm));
                    nationalityDropdown.innerHTML = '';
                    if (filtered.length > 0 && searchTerm.length > 0) {
                        filtered.forEach(n => {
                            const div = document.createElement('div');
                            div.textContent = n;
                            div.style.cssText = 'padding: 8px 10px; cursor: pointer; transition: background-color 0.1s ease;';
                            div.onmouseover = () => div.style.backgroundColor = '#f0f4ff';
                            div.onmouseout = () => div.style.backgroundColor = 'white';
                            div.onclick = () => {
                                nationalityInput.value = n;
                                nationalityDropdown.style.display = 'none';
                            };
                            nationalityDropdown.appendChild(div);
                        });
                        nationalityDropdown.style.display = 'block';
                    } else {
                        nationalityDropdown.style.display = 'none';
                    }
                });
                nationalityInput.addEventListener('focus', () => {
                    if (nationalityInput.value.length > 0) nationalityDropdown.style.display = 'block';
                });
                nationalityInput.addEventListener('blur', () => {
                    setTimeout(() => nationalityDropdown.style.display = 'none', 100); // Delay to allow click on dropdown item
                });

                // File input change and preview
                documentFileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        fileLabelText.textContent = file.name;
                        filePreviewDiv.style.display = 'block';
                        filePreviewDiv.innerHTML = ''; // Clear previous preview

                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                filePreviewDiv.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; height: auto; max-height: 100px; margin-top: 10px; border-radius: 5px;">`;
                            };
                            reader.readAsDataURL(file);
                        } else if (file.type === 'application/pdf') {
                            filePreviewDiv.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; margin-top: 10px; color: #ef4444;">${ICONS.fileText} PDF Seleccionado</div>`;
                        }
                    } else {
                        fileLabelText.textContent = 'Seleccionar archivo (imagen o PDF)';
                        filePreviewDiv.style.display = 'none';
                    }
                });


                // Close modal event listeners
                closeButton.addEventListener('click', () => modalOverlay.remove());
                cancelButton.addEventListener('click', () => modalOverlay.remove());
                modalOverlay.addEventListener('click', (e) => {
                    if (e.target === modalOverlay) {
                        modalOverlay.remove();
                    }
                });

                // Form submission logic
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    formMessageDiv.textContent = ''; // Clear previous messages
                    formMessageDiv.className = 'bimcord-form-message'; // Reset class

                    submitButton.disabled = true;
                    submitButton.textContent = 'Enviando...';

                    const formData = new FormData(form);

                    // Add unit and project data from the button's dataset
                    formData.append('unitId', unit.id);
                    formData.append('unitNumber', unit.numero);
                    formData.append('unitPrice', unit.precio);
                    formData.append('unitArea', unit.area);
                    formData.append('projectId', projectId); // From widget options

                    // Handle empty date field for documentExpiry
                    if (formData.get('documentExpiry') === '') {
                        formData.set('documentExpiry', ''); 
                    }

                    try {
                        const response = await fetch(`${apiBaseUrl}/api/auth/public-client-interest/`, {
                            method: 'POST',
                            body: formData,
                        });

                        const responseData = await response.json();

                        if (response.ok) {
                            formMessageDiv.textContent = responseData.message || '¡Gracias por tu interés! Nos pondremos en contacto pronto.';
                            formMessageDiv.classList.add('bimcord-success');
                            form.reset(); // Clear the form
                            // Optionally close modal after a delay
                            setTimeout(() => modalOverlay.remove(), 3000);
                        } else {
                            let errorMessage = 'Error al registrar tu interés. Por favor, intenta de nuevo.';
                            if (responseData.detail) {
                                errorMessage = responseData.detail;
                            } else if (responseData.error) {
                                errorMessage = responseData.error;
                            } else if (typeof responseData === 'object') {
                                // Attempt to parse field-specific errors
                                errorMessage = Object.values(responseData).flat().join('; ');
                            }
                            formMessageDiv.textContent = errorMessage;
                            formMessageDiv.classList.add('bimcord-error');
                        }
                    } catch (error) {
                        console.error('Error de red o inesperado:', error);
                        formMessageDiv.textContent = 'Ocurrió un error de conexión. Por favor, verifica tu internet e intenta de nuevo.';
                        formMessageDiv.classList.add('bimcord-error');
                    } finally {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Enviar Información';
                    }
                });
            };

            // --- Main Widget Rendering Logic ---

            showLoading('Cargando lista de precios...');

            fetch(`${apiBaseUrl}/api/projects/public-listas-precios/?proyecto_id=${projectId}`)
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.detail || 'Error al cargar la lista de precios.'); });
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data) {
                        showError('No se encontró un listado de precios público para este proyecto.');
                        return;
                    }

                    let widgetHtml = `
                        <div class="ppl-header">
                            <h1 class="ppl-project-name">${data.proyecto_detail.nombre}</h1>
                            <p class="ppl-list-title">Lista de Precios Pública</p>
                            ${data.proyecto_detail.imagen ? `<img src="${data.proyecto_detail.imagen}" alt="${data.proyecto_detail.nombre}" class="ppl-project-image">` : ''}
                        </div>
                        <div class="ppl-blocks-container">
                    `;

                    if (data.blocks_with_units && data.blocks_with_units.length > 0) {
                        data.blocks_with_units.forEach(block => {
                            widgetHtml += `
                                <div class="ppl-block-card">
                                    <h2 class="ppl-block-title">${block.nombre} (${block.tipo})</h2>
                                    <div class="ppl-units-table-wrapper">
                                        <table class="ppl-units-table">
                                            <thead>
                                                <tr>
                                                    <th>Unidad</th>
                                                    <th>Nivel</th>
                                                    <th>Área (m²)</th>
                                                    <th>Precio</th>
                                                    <th>Estado</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                            `;
                            if (block.units && block.units.length > 0) {
                                block.units.filter(unit => unit.estado === 'Disponible').forEach(unit => {
                                    widgetHtml += `
                                        <tr>
                                            <td>${unit.numero}</td>
                                            <td>${unit.nivel}</td>
                                            <td>${unit.area}</td>
                                            <td>${formatCurrency(unit.precio)}</td>
                                            <td><span class="ppl-unit-status ppl-status-available">${unit.estado}</span></td>
                                            <td>
                                                <button class="ppl-interest-button" 
                                                        data-unit-id="${unit.id}" 
                                                        data-unit-numero="${unit.numero}"
                                                        data-unit-nivel="${unit.nivel}"
                                                        data-unit-block-name="${block.nombre}"
                                                        data-unit-precio="${unit.precio}"
                                                        data-unit-area="${unit.area}"
                                                        data-project-name="${data.proyecto_detail.nombre}"
                                                        >Me Interesa</button>
                                            </td>
                                        </tr>
                                    `;
                                });
                            } else {
                                widgetHtml += `<tr><td colspan="6" class="ppl-no-units">No hay unidades disponibles en este bloque.</td></tr>`;
                            }
                            widgetHtml += `
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            `;
                        });
                    } else {
                        widgetHtml += `<div class="ppl-no-blocks">No hay bloques asociados a esta lista de precios.</div>`;
                    }

                    widgetHtml += `</div>`; // Close ppl-blocks-container
                    container.innerHTML = widgetHtml;

                    // Add event listeners for "Me Interesa" buttons
                    container.querySelectorAll('.ppl-interest-button').forEach(button => {
                        button.addEventListener('click', (e) => {
                            const btn = e.target;
                            const unitData = {
                                id: btn.dataset.unitId,
                                numero: btn.dataset.unitNumero,
                                nivel: btn.dataset.unitNivel,
                                block_name: btn.dataset.unitBlockName,
                                precio: btn.dataset.unitPrecio,
                                area: btn.dataset.unitArea,
                                project_name: btn.dataset.projectName,
                            };
                            showInterestModal(unitData); // Call the modal function
                        });
                    });

                })
                .catch(error => {
                    console.error('PublicPriceList: Failed to load price list:', error);
                    showError(error.message || 'Error al cargar la lista de precios.');
                });
        }
    };
})();
