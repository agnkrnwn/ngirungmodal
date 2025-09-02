// hitung.js
        function formatRupiah(number) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(number);
        }

        function updatePlatformFees() {
            const platform = document.getElementById('platform').value;
            const platformTitle = document.getElementById('platformTitle');
            const feeDetails = document.getElementById('feeDetails');
            const tiktokAdditionalFees = document.getElementById('tiktokAdditionalFees');
            
            // Add event listeners for fee inputs after they are created
            setTimeout(() => {
                addFeeInputListeners();
            }, 100);
            
            if (platform === 'tiktok') {
                platformTitle.textContent = 'Fee TikTok Shop';
                feeDetails.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <span>Dynamic Fee:</span>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="tiktokDynamicFee" value="5.5" min="0" step="0.1" 
                                   class="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white">
                            <span class="text-xs text-gray-500">%</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span>TikTok Fee:</span>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="tiktokPlatformFee" value="8.0" min="0" step="0.1" 
                                   class="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white">
                            <span class="text-xs text-gray-500">%</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span>Biaya Proses:</span>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="tiktokProcessFee" value="1250" min="0" step="100" 
                                   class="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white">
                            <span class="text-xs text-gray-500">Rp</span>
                        </div>
                    </div>
                    <div class="flex justify-between pt-2 border-t border-gray-200">
                        <span class="font-medium">Total Fee:</span>
                        <span id="tiktokTotalFee" class="font-bold text-primary-600">≈ 13,5% + Rp 1.250</span>
                    </div>
                `;
                tiktokAdditionalFees.classList.remove('hidden');
                        } else if (platform === 'shopee') {
                platformTitle.textContent = 'Fee Shopee';
                feeDetails.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <span>Biaya Lainnya:</span>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="shopeeBiayaLainnya" value="8" min="0" step="0.1" 
                                   class="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white">
                            <span class="text-xs text-gray-500">%</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span>Biaya Layanan:</span>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="shopeeBiayaLayanan" value="7" min="0" step="0.1" 
                                   class="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white">
                            <span class="text-xs text-gray-500">%</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span>Biaya Proses:</span>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="shopeeBiayaProses" value="1250" min="0" step="100" 
                                   class="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white">
                            <span class="text-xs text-gray-500">Rp</span>
                        </div>
                    </div>
                    <div class="flex justify-between pt-2 border-t border-gray-200">
                        <span class="font-medium">Total Fee:</span>
                        <span id="shopeeTotalFee" class="font-bold text-primary-600">15% + Rp 1.250</span>
                    </div>
                `;
                tiktokAdditionalFees.classList.add('hidden');
                document.getElementById('platformAdditionalFee').classList.remove('hidden');
            }
        }

        function calculatePrice() {
            const platform = document.getElementById('platform').value;
            const modalPrice = parseFloat(document.getElementById('modalPrice').value) || 0;
            const affiliateFee = parseFloat(document.getElementById('affiliateFee').value) || 0;
            const additionalCost = parseFloat(document.getElementById('additionalCost').value) || 0;
            const profit = parseFloat(document.getElementById('profit').value) || 0;
            const method = document.querySelector('input[name="method"]:checked').value;
            
                         // TikTok additional fees
             const komisiKategori = document.getElementById('komisiKategori').checked ? 4 : 0;
             const programVoucher = document.getElementById('programVoucher').checked ? 4 : 0;
             
             // Platform additional fee
             const platformAdditionalFee = parseFloat(document.getElementById('platformAdditionalFeeInput').value) || 0;

            if (modalPrice <= 0) {
                alert('Mohon masukkan harga modal yang valid!');
                return;
            }

            let results = {};
            
            const additionalCostAmount = modalPrice * (additionalCost / 100);
            const totalModalCost = modalPrice + additionalCostAmount;
            
            if (platform === 'tiktok') {
                // Get editable fee values
                const dynamicFeeRate = parseFloat(document.getElementById('tiktokDynamicFee')?.value) || 5.5;
                const platformFeeRate = parseFloat(document.getElementById('tiktokPlatformFee')?.value) || 8.0;
                const processFee = parseFloat(document.getElementById('tiktokProcessFee')?.value) || 1250;
                
                if (method === 'markup') {
                    const profitAmount = totalModalCost * (profit / 100);
                    const targetReceived = totalModalCost + profitAmount;
                    
                    const totalFeeRate = (dynamicFeeRate + platformFeeRate + affiliateFee + komisiKategori + programVoucher + platformAdditionalFee) / 100;
                    const sellingPrice = (targetReceived + processFee) / (1 - totalFeeRate);
                    
                    const dynamicFee = sellingPrice * (dynamicFeeRate / 100);
                    const platformFee = sellingPrice * (platformFeeRate / 100);
                    const biayaProses = processFee;
                    const affiliateCost = sellingPrice * (affiliateFee / 100);
                    const komisiKategoriCost = sellingPrice * (komisiKategori / 100);
                    const programVoucherCost = sellingPrice * (programVoucher / 100);
                    const platformAdditionalCost = sellingPrice * (platformAdditionalFee / 100);
                    const totalFees = dynamicFee + platformFee + biayaProses + affiliateCost + komisiKategoriCost + programVoucherCost + platformAdditionalCost;
                    const netReceived = sellingPrice - totalFees;
                    const actualProfit = netReceived - totalModalCost;
                    
                    results = {
                        platform: 'TikTok Shop',
                        modalPrice,
                        additionalCostAmount,
                        totalModalCost,
                        profitAmount,
                        sellingPrice,
                        dynamicFee,
                        platformFee,
                        biayaProses,
                        affiliateCost,
                        komisiKategoriCost,
                        programVoucherCost,
                        platformAdditionalCost,
                        totalFees,
                        netReceived,
                        actualProfit,
                        fixedFee: 1250,
                        komisiKategori,
                        programVoucher,
                        platformAdditionalFee
                    };
                } else {
                    const totalFeeRate = (dynamicFeeRate + platformFeeRate + affiliateFee + komisiKategori + programVoucher + platformAdditionalFee) / 100;
                    const profitMargin = profit / 100;
                    const sellingPrice = (totalModalCost + processFee) / (1 - totalFeeRate - profitMargin);
                    
                    const dynamicFee = sellingPrice * (dynamicFeeRate / 100);
                    const platformFee = sellingPrice * (platformFeeRate / 100);
                    const biayaProses = processFee;
                    const affiliateCost = sellingPrice * (affiliateFee / 100);
                    const komisiKategoriCost = sellingPrice * (komisiKategori / 100);
                    const programVoucherCost = sellingPrice * (programVoucher / 100);
                    const platformAdditionalCost = sellingPrice * (platformAdditionalFee / 100);
                    const totalFees = dynamicFee + platformFee + biayaProses + affiliateCost + komisiKategoriCost + programVoucherCost + platformAdditionalCost;
                    const netReceived = sellingPrice - totalFees;
                    const actualProfit = netReceived - totalModalCost;
                    
                    results = {
                        platform: 'TikTok Shop',
                        modalPrice,
                        additionalCostAmount,
                        totalModalCost,
                        profitAmount: actualProfit,
                        sellingPrice,
                        dynamicFee,
                        platformFee,
                        biayaProses,
                        affiliateCost,
                        komisiKategoriCost,
                        programVoucherCost,
                        platformAdditionalCost,
                        totalFees,
                        netReceived,
                        actualProfit,
                        fixedFee: 1250,
                        komisiKategori,
                        programVoucher,
                        platformAdditionalFee
                    };
                }
            } else if (platform === 'shopee') {
                // Shopee: affiliate fee ditambah 5% dari input user
                const shopeeAffiliateFee = affiliateFee > 0 ? affiliateFee + 5 : affiliateFee;
                
                if (method === 'markup') {
                    const profitAmount = totalModalCost * (profit / 100);
                    const targetReceived = totalModalCost + profitAmount;
                    
                    const percentageFeeRate = (8 + 7 + shopeeAffiliateFee + platformAdditionalFee) / 100;
                    const sellingPrice = (targetReceived + 1250) / (1 - percentageFeeRate);
                    
                    const biayaLainnya = sellingPrice * 0.08;
                    const biayaLayanan = sellingPrice * 0.07;
                    const biayaProses = 1250;
                    const affiliateCost = sellingPrice * (shopeeAffiliateFee / 100);
                    const platformAdditionalCost = sellingPrice * (platformAdditionalFee / 100);
                    const totalFees = biayaLainnya + biayaLayanan + biayaProses + affiliateCost + platformAdditionalCost;
                    const netReceived = sellingPrice - totalFees;
                    const actualProfit = netReceived - totalModalCost;
                    
                    results = {
                        platform: 'Shopee',
                        modalPrice,
                        additionalCostAmount,
                        totalModalCost,
                        profitAmount,
                        sellingPrice,
                        biayaLainnya,
                        biayaLayanan,
                        biayaProses,
                        affiliateCost,
                        platformAdditionalCost,
                        totalFees,
                        netReceived,
                        actualProfit,
                        fixedFee: 1250,
                        shopeeAffiliateFee: shopeeAffiliateFee,
                        platformAdditionalFee
                    };
                } else {
                    const profitMargin = profit / 100;
                    const percentageFeeRate = (8 + 7 + shopeeAffiliateFee + platformAdditionalFee) / 100;
                    const sellingPrice = (totalModalCost + 1250) / (1 - percentageFeeRate - profitMargin);
                    
                    const biayaLainnya = sellingPrice * 0.08;
                    const biayaLayanan = sellingPrice * 0.07;
                    const biayaProses = 1250;
                    const affiliateCost = sellingPrice * (shopeeAffiliateFee / 100);
                    const platformAdditionalCost = sellingPrice * (platformAdditionalFee / 100);
                    const totalFees = biayaLainnya + biayaLayanan + biayaProses + affiliateCost + platformAdditionalCost;
                    const netReceived = sellingPrice - totalFees;
                    const actualProfit = netReceived - totalModalCost;
                    
                    results = {
                        platform: 'Shopee',
                        modalPrice,
                        additionalCostAmount,
                        totalModalCost,
                        profitAmount: actualProfit,
                        sellingPrice,
                        biayaLainnya,
                        biayaLayanan,
                        biayaProses,
                        affiliateCost,
                        platformAdditionalCost,
                        totalFees,
                        netReceived,
                        actualProfit,
                        fixedFee: 1250,
                        shopeeAffiliateFee: shopeeAffiliateFee,
                        platformAdditionalFee
                    };
                }
            }

            displayResults(results, method);
        }

        function displayResults(results, method) {
            const breakdown = document.getElementById('breakdown');
            const profitOnCost = ((results.actualProfit / results.totalModalCost) * 100).toFixed(1);
            
            let feeBreakdown = '';
            
            if (results.platform === 'TikTok Shop') {
                const dynamicFeeRate = parseFloat(document.getElementById('tiktokDynamicFee')?.value) || 5.5;
                const platformFeeRate = parseFloat(document.getElementById('tiktokPlatformFee')?.value) || 8.0;
                
                feeBreakdown = `
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Dynamic Fee (${dynamicFeeRate}%)</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.dynamicFee)}</span>
                    </div>
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">TikTok Fee (${platformFeeRate}%)</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.platformFee)}</span>
                    </div>
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Biaya Proses Pesanan</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.biayaProses)}</span>
                    </div>
                `;
                
                // Add additional TikTok fees if they exist
                if (results.komisiKategori > 0) {
                    feeBreakdown += `
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Komisi Kategori (4%)</span>
                            <span class="font-medium text-gray-900">${formatRupiah(results.komisiKategoriCost)}</span>
                        </div>
                    `;
                }
                
                if (results.programVoucher > 0) {
                    feeBreakdown += `
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Program Voucher Extra (4%)</span>
                            <span class="font-medium text-gray-900">${formatRupiah(results.programVoucherCost)}</span>
                        </div>
                    `;
                }
                
                if (results.platformAdditionalFee > 0) {
                    feeBreakdown += `
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Biaya Tambahan Platform (${results.platformAdditionalFee}%)</span>
                            <span class="font-medium text-gray-900">${formatRupiah(results.platformAdditionalCost)}</span>
                        </div>
                    `;
                }
            } else if (results.platform === 'Shopee') {
                feeBreakdown = `
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Biaya Lainnya (8%)</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.biayaLainnya)}</span>
                    </div>
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Biaya Layanan (7%)</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.biayaLayanan)}</span>
                    </div>
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Biaya Proses Pesanan</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.biayaProses)}</span>
                    </div>
                `;
                
                if (results.platformAdditionalFee > 0) {
                    feeBreakdown += `
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Biaya Tambahan Platform (${results.platformAdditionalFee}%)</span>
                            <span class="font-medium text-gray-900">${formatRupiah(results.platformAdditionalCost)}</span>
                        </div>
                    `;
                }
            }
            
            breakdown.innerHTML = `
                <!-- Input Summary -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Ringkasan Input</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Harga Modal:</span>
                            <span class="font-medium">${formatRupiah(results.modalPrice)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Biaya Tambahan:</span>
                            <span class="font-medium">${formatRupiah(results.additionalCostAmount)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Modal + Biaya:</span>
                            <span class="font-medium">${formatRupiah(results.totalModalCost)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Metode:</span>
                            <span class="font-medium">${method.charAt(0).toUpperCase() + method.slice(1)}</span>
                        </div>
                    </div>
                </div>

                <!-- Selling Price -->
                <div class="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                    <div class="text-center">
                        <h3 class="text-lg font-semibold text-primary-900 mb-2">Harga Jual Optimal</h3>
                        <div class="flex items-center justify-center space-x-3">
                            <div id="sellingPriceDisplay" class="text-2xl font-bold text-primary-600">${formatRupiah(results.sellingPrice)}</div>
                            <button id="editPriceBtn" class="text-primary-600 hover:text-primary-800 focus:outline-none" onclick="editSellingPrice(${results.sellingPrice})">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                        <p class="text-sm text-primary-700 mt-1">${results.platform} • ${method.charAt(0).toUpperCase() + method.slice(1)}</p>
                    </div>
                </div>

                <!-- Cost Breakdown -->
                <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Breakdown Biaya Modal</h3>
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Harga Modal Dasar</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.modalPrice)}</span>
                    </div>
                    <div class="flex justify-between items-center py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600">Biaya Tambahan (${parseFloat(document.getElementById('additionalCost').value) || 0}%)</span>
                        <span class="font-medium text-gray-900">${formatRupiah(results.additionalCostAmount)}</span>
                    </div>
                    <div class="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                        <span class="text-sm font-medium text-gray-900">Total Modal + Biaya</span>
                        <span class="font-bold text-gray-900">${formatRupiah(results.totalModalCost)}</span>
                    </div>
                </div>

                

                <!-- Fee Breakdown -->
                <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Breakdown Biaya Platform</h3>
                    ${feeBreakdown}
                                         <div class="flex justify-between items-center py-3 border-b border-gray-100">
                         <span class="text-sm text-gray-600">Biaya Affiliate${results.platform === 'Shopee' && results.shopeeAffiliateFee > 0 ? ` (${results.shopeeAffiliateFee}%)` : ''}</span>
                         <span class="font-medium text-gray-900">${formatRupiah(results.affiliateCost)}</span>
                     </div>
                    <div class="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                        <span class="text-sm font-medium text-gray-900">Total Semua Fee</span>
                        <span class="font-bold text-gray-900">${formatRupiah(results.totalFees)}</span>
                    </div>
                </div>

                <!-- Profit Breakdown -->
                <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Breakdown Keuntungan</h3>
                    ${method === 'markup' ? `
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Target Keuntungan (${parseFloat(document.getElementById('profit').value) || 0}% dari modal)</span>
                            <span class="font-medium text-gray-900">${formatRupiah(results.profitAmount)}</span>
                        </div>
                        <div class="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                            <span class="text-sm font-medium text-gray-900">Target Yang Diterima</span>
                            <span class="font-bold text-gray-900">${formatRupiah(results.totalModalCost + results.profitAmount)}</span>
                        </div>
                    ` : `
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Target Keuntungan (${parseFloat(document.getElementById('profit').value) || 0}% dari harga jual)</span>
                            <span class="font-medium text-gray-900">${formatRupiah(results.sellingPrice * (parseFloat(document.getElementById('profit').value) || 0) / 100)}</span>
                        </div>
                        <div class="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                            <span class="text-sm font-medium text-gray-900">Target Yang Diterima</span>
                            <span class="font-bold text-gray-900">${formatRupiah(results.sellingPrice * (1 - (parseFloat(document.getElementById('profit').value) || 0) / 100))}</span>
                        </div>
                    `}
                </div>

                <!-- Final Results -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 class="text-sm font-medium text-green-900 mb-3">Hasil Akhir</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-green-700">Yang Diterima (setelah fee)</span>
                            <span class="font-semibold text-green-900">${formatRupiah(results.netReceived)}</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-green-200">
                            <span class="text-sm text-green-700">Keuntungan Bersih</span>
                            <span class="font-bold text-green-900">${formatRupiah(results.actualProfit)} (${profitOnCost}% dari modal)</span>
                        </div>
                    </div>
                </div>
            `;

                         document.getElementById('results').classList.remove('hidden');
         }
         
         function editSellingPrice(currentPrice) {
             // Get the selling price display element
             const priceDisplay = document.getElementById('sellingPriceDisplay');
             
             // Create an input field with the current price value
             const inputField = document.createElement('input');
             inputField.type = 'number';
             inputField.value = Math.round(currentPrice);
             inputField.className = 'text-2xl font-bold text-primary-600 bg-white border border-primary-300 rounded px-2 py-1 w-48 text-center';
             inputField.id = 'sellingPriceInput';
             inputField.min = '0';
             inputField.step = '100';
             
             // Create a save button
             const saveButton = document.createElement('button');
             saveButton.innerHTML = `
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                 </svg>
             `;
             saveButton.className = 'text-green-600 hover:text-green-800 focus:outline-none ml-2';
             saveButton.onclick = function() {
                 const newPrice = parseFloat(inputField.value);
                 if (!isNaN(newPrice) && newPrice > 0) {
                     recalculateBasedOnSellingPrice(newPrice);
                 } else {
                     alert('Mohon masukkan harga yang valid!');
                 }
             };
             
             // Create a cancel button
             const cancelButton = document.createElement('button');
             cancelButton.innerHTML = `
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                 </svg>
             `;
             cancelButton.className = 'text-red-600 hover:text-red-800 focus:outline-none ml-2';
             cancelButton.onclick = function() {
                 // Revert to display mode
                 priceDisplay.innerHTML = formatRupiah(currentPrice);
                 // Show edit button again
                 document.getElementById('editPriceBtn').style.display = 'inline-block';
                 // Remove input and buttons
                 inputField.remove();
                 saveButton.remove();
                 cancelButton.remove();
             };
             
             // Replace the price display with the input field and buttons
             priceDisplay.innerHTML = '';
             priceDisplay.appendChild(inputField);
             priceDisplay.appendChild(saveButton);
             priceDisplay.appendChild(cancelButton);
             
             // Hide the edit button
             document.getElementById('editPriceBtn').style.display = 'none';
             
             // Focus on the input field
             inputField.focus();
         }
         
         function recalculateBasedOnSellingPrice(newSellingPrice) {
             // Get current input values
             const platform = document.getElementById('platform').value;
             const modalPrice = parseFloat(document.getElementById('modalPrice').value) || 0;
             const affiliateFee = parseFloat(document.getElementById('affiliateFee').value) || 0;
             const additionalCost = parseFloat(document.getElementById('additionalCost').value) || 0;
             const method = document.querySelector('input[name="method"]:checked').value;
             
             // TikTok additional fees
             const komisiKategori = document.getElementById('komisiKategori').checked ? 4 : 0;
             const programVoucher = document.getElementById('programVoucher').checked ? 4 : 0;
             
             // Platform additional fee
             const platformAdditionalFee = parseFloat(document.getElementById('platformAdditionalFeeInput').value) || 0;
             
             if (modalPrice <= 0) {
                 alert('Mohon masukkan harga modal yang valid!');
                 return;
             }
             
             let results = {};
             const additionalCostAmount = modalPrice * (additionalCost / 100);
             const totalModalCost = modalPrice + additionalCostAmount;
             
             if (platform === 'tiktok') {
                 // Get editable fee values
                 const dynamicFeeRate = parseFloat(document.getElementById('tiktokDynamicFee')?.value) || 5.5;
                 const platformFeeRate = parseFloat(document.getElementById('tiktokPlatformFee')?.value) || 8.0;
                 const processFee = parseFloat(document.getElementById('tiktokProcessFee')?.value) || 1250;
                 
                 // Calculate fees based on the new selling price
                 const dynamicFee = newSellingPrice * (dynamicFeeRate / 100);
                 const platformFee = newSellingPrice * (platformFeeRate / 100);
                 const biayaProses = processFee;
                 const affiliateCost = newSellingPrice * (affiliateFee / 100);
                 const komisiKategoriCost = newSellingPrice * (komisiKategori / 100);
                 const programVoucherCost = newSellingPrice * (programVoucher / 100);
                 const platformAdditionalCost = newSellingPrice * (platformAdditionalFee / 100);
                 const totalFees = dynamicFee + platformFee + biayaProses + affiliateCost + komisiKategoriCost + programVoucherCost + platformAdditionalCost;
                 const netReceived = newSellingPrice - totalFees;
                 const actualProfit = netReceived - totalModalCost;
                 
                 // Calculate profit percentage based on method
                 let profitPercentage = 0;
                 let profitAmount = 0;
                 
                 if (method === 'markup') {
                     profitAmount = actualProfit;
                     profitPercentage = (actualProfit / totalModalCost) * 100;
                 } else {
                     // For margin method, profit is calculated from selling price
                     profitAmount = newSellingPrice * (actualProfit / (newSellingPrice - totalFees + totalModalCost));
                     profitPercentage = (actualProfit / newSellingPrice) * 100;
                 }
                 
                 results = {
                     platform: 'TikTok Shop',
                     modalPrice,
                     additionalCostAmount,
                     totalModalCost,
                     profitAmount,
                     profitPercentage,
                     sellingPrice: newSellingPrice,
                     dynamicFee,
                     platformFee,
                     biayaProses,
                     affiliateCost,
                     komisiKategoriCost,
                     programVoucherCost,
                     platformAdditionalCost,
                     totalFees,
                     netReceived,
                     actualProfit,
                     fixedFee: 1250,
                     komisiKategori,
                     programVoucher,
                     platformAdditionalFee
                 };
             } else if (platform === 'shopee') {
                 // Shopee: affiliate fee ditambah 5% dari input user
                 const shopeeAffiliateFee = affiliateFee > 0 ? affiliateFee + 5 : affiliateFee;
                 
                 // Calculate fees based on the new selling price
                 const biayaLainnya = newSellingPrice * 0.08;
                 const biayaLayanan = newSellingPrice * 0.07;
                 const biayaProses = 1250;
                 const affiliateCost = newSellingPrice * (shopeeAffiliateFee / 100);
                 const platformAdditionalCost = newSellingPrice * (platformAdditionalFee / 100);
                 const totalFees = biayaLainnya + biayaLayanan + biayaProses + affiliateCost + platformAdditionalCost;
                 const netReceived = newSellingPrice - totalFees;
                 const actualProfit = netReceived - totalModalCost;
                 
                 // Calculate profit percentage based on method
                 let profitPercentage = 0;
                 let profitAmount = 0;
                 
                 if (method === 'markup') {
                     profitAmount = actualProfit;
                     profitPercentage = (actualProfit / totalModalCost) * 100;
                 } else {
                     // For margin method, profit is calculated from selling price
                     profitAmount = newSellingPrice * (actualProfit / (newSellingPrice - totalFees + totalModalCost));
                     profitPercentage = (actualProfit / newSellingPrice) * 100;
                 }
                 
                 results = {
                     platform: 'Shopee',
                     modalPrice,
                     additionalCostAmount,
                     totalModalCost,
                     profitAmount,
                     profitPercentage,
                     sellingPrice: newSellingPrice,
                     biayaLainnya,
                     biayaLayanan,
                     biayaProses,
                     affiliateCost,
                     platformAdditionalCost,
                     totalFees,
                     netReceived,
                     actualProfit,
                     fixedFee: 1250,
                     shopeeAffiliateFee: shopeeAffiliateFee,
                     platformAdditionalFee
                 };
             }
             
             // Update the display with new results
             displayResults(results, method);
         }
         
         function addFeeInputListeners() {
             // TikTok fee inputs
             const tiktokDynamicFee = document.getElementById('tiktokDynamicFee');
             const tiktokPlatformFee = document.getElementById('tiktokPlatformFee');
             const tiktokProcessFee = document.getElementById('tiktokProcessFee');
             
             if (tiktokDynamicFee) {
                 tiktokDynamicFee.addEventListener('input', updateTikTokTotalFee);
                 tiktokPlatformFee.addEventListener('input', updateTikTokTotalFee);
                 tiktokProcessFee.addEventListener('input', updateTikTokTotalFee);
             }
             
             // Shopee fee inputs
             const shopeeBiayaLainnya = document.getElementById('shopeeBiayaLainnya');
             const shopeeBiayaLayanan = document.getElementById('shopeeBiayaLayanan');
             const shopeeBiayaProses = document.getElementById('shopeeBiayaProses');
             
             if (shopeeBiayaLainnya) {
                 shopeeBiayaLainnya.addEventListener('input', updateShopeeTotalFee);
                 shopeeBiayaLayanan.addEventListener('input', updateShopeeTotalFee);
                 shopeeBiayaProses.addEventListener('input', updateShopeeTotalFee);
             }
         }
         
         function updateTikTokTotalFee() {
             const dynamicFee = parseFloat(document.getElementById('tiktokDynamicFee')?.value) || 5.5;
             const platformFee = parseFloat(document.getElementById('tiktokPlatformFee')?.value) || 8.0;
             const processFee = parseFloat(document.getElementById('tiktokProcessFee')?.value) || 1250;
             
             const totalFeeElement = document.getElementById('tiktokTotalFee');
             if (totalFeeElement) {
                 totalFeeElement.textContent = `≈ ${(dynamicFee + platformFee).toFixed(1)}% + Rp ${processFee.toLocaleString('id-ID')}`;
             }
         }
         
         function updateShopeeTotalFee() {
             const biayaLainnya = parseFloat(document.getElementById('shopeeBiayaLainnya')?.value) || 8;
             const biayaLayanan = parseFloat(document.getElementById('shopeeBiayaLayanan')?.value) || 7;
             const biayaProses = parseFloat(document.getElementById('shopeeBiayaProses')?.value) || 1250;
             
             const totalFeeElement = document.getElementById('shopeeTotalFee');
             if (totalFeeElement) {
                 totalFeeElement.textContent = `${biayaLainnya + biayaLayanan}% + Rp ${biayaProses.toLocaleString('id-ID')}`;
             }
         }
         
         // Initialize page
         document.addEventListener('DOMContentLoaded', function() {
             // Call updatePlatformFees to set initial state
             updatePlatformFees();
             
             // Register Service Worker for PWA
             if ('serviceWorker' in navigator) {
                 navigator.serviceWorker.register('sw.js')
                     .then(function(registration) {
                         console.log('Service Worker registered successfully:', registration);
                     })
                     .catch(function(error) {
                         console.log('Service Worker registration failed:', error);
                     });
             }
         });