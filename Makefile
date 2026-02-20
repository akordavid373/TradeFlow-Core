# TradeFlow-Core Makefile

all: test build

test:
	cargo test

build:
	cargo build --target wasm32-unknown-unknown --release

deploy-testnet:
	@echo "Deploying invoice_nft contract to Stellar Testnet..."
	@CONTRACT_ID=$$(soroban contract deploy \
		--wasm target/wasm32-unknown-unknown/release/invoice_nft.wasm \
		--source alice \
		--network testnet); \
	echo "Contract deployed successfully!"; \
	echo "Contract ID: $$CONTRACT_ID"

fmt:
	cargo fmt --all

clean:
	cargo clean
