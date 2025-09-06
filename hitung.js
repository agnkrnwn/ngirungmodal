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
            // Add loading animation to button
            const button = document.querySelector('button[onclick="calculatePrice()"]');
            const originalText = button.innerHTML;
            button.innerHTML = `
                <div class="flex items-center justify-center space-x-3">
                    <svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <span class="text-lg">Menghitung...</span>
                </div>
            `;
            button.disabled = true;

            // Simulate processing time for better UX
            setTimeout(() => {
                const platform = document.getElementById('platform').value;
                const modalPrice = parseFloat(document.getElementById('modalPrice').value) || 0;
                const affiliateFee = parseFloat(document.getElementById('affiliateFee').value) || 0;
                const additionalCost = parseFloat(document.getElementById('additionalCost').value) || 0;
                const profit = parseFloat(document.getElementById('profit').value) || 0;
                const fakePricePercentage = parseFloat(document.getElementById('fakePrice').value) || 80;
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
                        platformAdditionalFee,
                        fakePricePercentage,
                        fakePrice: sellingPrice / (1 - fakePricePercentage / 100)
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
                        platformAdditionalFee,
                        fakePricePercentage,
                        fakePrice: sellingPrice / (1 - fakePricePercentage / 100)
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
                        platformAdditionalFee,
                        fakePricePercentage,
                        fakePrice: sellingPrice / (1 - fakePricePercentage / 100)
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
                        platformAdditionalFee,
                        fakePricePercentage,
                        fakePrice: sellingPrice / (1 - fakePricePercentage / 100)
                    };
                }
            }

            displayResults(results, method);

                // Reset button after calculation
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 500);
            }, 1500); // Simulate 1.5 second processing time
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
                <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm animate-fade-in" style="animation-delay: 0.1s">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Ringkasan Input</h3>
                    </div>
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
                <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 border border-blue-200 rounded-2xl p-8 mb-8 shadow-lg animate-fade-in" style="animation-delay: 0.2s">
                    <div class="text-center">
                        <div class="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">Harga Jual Optimal</h3>
                        <div class="flex items-center justify-center space-x-4 mb-3">
                            <div id="sellingPriceDisplay" class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${formatRupiah(results.sellingPrice)}</div>
                            <button id="editPriceBtn" class="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-110" onclick="editSellingPrice(${results.sellingPrice})">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                        <div class="inline-block px-4 py-2 bg-white/60 rounded-full">
                            <p class="text-sm text-gray-700 font-medium">${results.platform} • ${method.charAt(0).toUpperCase() + method.slice(1)}</p>
                        </div>
                    </div>
                </div>

                <!-- Fake/Cross-out Price for TikTok -->
                <div class="bg-gradient-to-br from-red-50 via-pink-50 to-red-100 border border-red-200 rounded-2xl p-8 mb-8 shadow-lg animate-fade-in" style="animation-delay: 0.3s">
                    <div class="text-center">
                        <div class="inline-block p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold bg-gradient-to-r from-red-900 to-pink-900 bg-clip-text text-transparent mb-6">Harga untuk Posting TikTok</h3>
                        <div class="space-y-4 mb-6">
                            <div class="bg-white/80 rounded-xl p-4 shadow-sm">
                                <span class="text-2xl text-red-600 line-through font-medium">${formatRupiah(results.fakePrice)}</span>
                                <span class="text-sm text-red-600 ml-2 bg-red-100 px-2 py-1 rounded-full">Harga Coret</span>
                            </div>
                            <div class="bg-white/80 rounded-xl p-4 shadow-sm">
                                <span class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${formatRupiah(results.sellingPrice)}</span>
                                <span class="text-sm text-green-600 ml-2 bg-green-100 px-2 py-1 rounded-full">Harga Diskon</span>
                            </div>
                        </div>
                        <div class="bg-white/90 rounded-xl p-4 border border-red-200 shadow-sm">
                            <div class="flex items-center justify-center mb-3">
                                <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                                <p class="text-sm text-red-800 font-bold">Tips Marketing</p>
                            </div>
                            <p class="text-xs text-red-700 mb-2">
                                Gunakan harga coret <span class="font-bold text-red-800">${formatRupiah(results.fakePrice)}</span>
                                di posting TikTok, lalu berikan "diskon" ke harga optimal
                                <span class="font-bold text-green-800">${formatRupiah(results.sellingPrice)}</span>
                            </p>
                            <div class="bg-gradient-to-r from-red-100 to-pink-100 rounded-lg p-3">
                                <p class="text-sm text-red-800 font-bold">
                                    Diskon: ${Math.round((results.fakePrice - results.sellingPrice) / results.fakePrice * 100)}%
                                    <span class="text-green-700">(Hemat ${formatRupiah(results.fakePrice - results.sellingPrice)})</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cost Breakdown -->
                <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg animate-fade-in" style="animation-delay: 0.4s">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Breakdown Biaya Modal</h3>
                    </div>
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
                <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg animate-fade-in" style="animation-delay: 0.5s">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Breakdown Biaya Platform</h3>
                    </div>
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
                <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg animate-fade-in" style="animation-delay: 0.55s">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Breakdown Keuntungan</h3>
                    </div>
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
                <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg animate-fade-in" style="animation-delay: 0.6s">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold bg-gradient-to-r from-green-900 to-emerald-900 bg-clip-text text-transparent">Hasil Akhir</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-white/80 rounded-xl p-4 shadow-sm">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                    </svg>
                                    <span class="text-sm text-green-700 font-medium">Yang Diterima (setelah fee)</span>
                                </div>
                                <span class="font-bold text-green-900 text-lg">${formatRupiah(results.netReceived)}</span>
                            </div>
                        </div>
                        <div class="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 shadow-sm border-2 border-green-200">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                    <span class="text-sm text-green-800 font-bold">Keuntungan Bersih</span>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-green-900 text-xl">${formatRupiah(results.actualProfit)}</div>
                                    <div class="text-xs text-green-700">(${profitOnCost}% dari modal)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                         document.getElementById('results').classList.remove('hidden');
                         document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
             const fakePricePercentage = parseFloat(document.getElementById('fakePrice').value) || 80;
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
                     platformAdditionalFee,
                     fakePricePercentage,
                     fakePrice: newSellingPrice / (1 - fakePricePercentage / 100)
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
                     platformAdditionalFee,
                     fakePricePercentage,
                     fakePrice: newSellingPrice / (1 - fakePricePercentage / 100)
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
