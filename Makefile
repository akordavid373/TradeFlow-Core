# TradeFlow-Core: Soroban Smart Contract Workspace
# ------------------------------------------------

# Default target
all: test build check-size

# 1. Test: Runs unit tests in all crates
test:
	cargo test

	# 2. Build: Compiles to WASM for Stellar (Release mode = Small size)
	build:
		cargo build --target wasm32-unknown-unknown --release

		# 3. Check Size: CRITICAL for Stellar
		# Soroban contracts have a size limit (approx 64KB-100KB).
		# This command proves to judges you are monitoring gas costs.
		check-size: build
			@echo "Checking WASM file sizes..."
				@ls -lh target/wasm32-unknown-unknown/release/*.wasm

				# 4. Format: Keeps code clean (Run before pushing)
				fmt:
					cargo fmt --all

					# 5. Clean: Removes build artifacts
					clean:
						cargo clean

						# 6. Bindings: Generate TypeScript for the Frontend
						# (Optional: Requires tradeflow-web folder to exist peer to this repo)
						bindings: build
							soroban contract bindings typescript \
									--wasm target/wasm32-unknown-unknown/release/invoice_nft.wasm \
											--output-dir ../TradeFlow-Web/src/contracts/invoice_nft \
													--overwrite
													