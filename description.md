# BillBoley: Voice-First Billing for Indian Shops

## The problem

Small shopkeepers in India handle sales throughout the day, often while answering questions, picking goods, and serving a queue. Entering every item and quantity into a billing screen takes attention away from the customer and can slow checkout, especially during busy hours.

Medium and large retailers face a related cost. They may pay for billing software, computers, barcode scanners, and staff training across several counters or stores. New employees need time to learn the system, while owners still need accurate bills and a clear view of each sale.

## The solution

BillBoley lets a shopkeeper or cashier describe a sale in everyday language. For example, they can say, “Do kilo chawal, aadha kilo chini, aur do doodh ke packet.” The system identifies the products and quantities, matches them against the store catalogue, calculates the bill, and displays a receipt for the cashier to check and correct before saving.

The planned product uses speech recognition and language understanding to handle familiar Indian languages and mixed-language phrases. It checks each item against the shop’s catalogue and prices instead of guessing when a product or quantity is unclear. Staff can correct the result on screen or use the existing product list and typing options. The cashier confirms the receipt before the sale is recorded.

## Who it is for

- **Kirana and neighborhood shops:** Owners can use spoken orders to speed up routine sales without navigating multiple fields for every item.
- **Medium-to-large stores:** Retailers can offer staff a simpler checkout flow, reduce training time, and lower dependence on a scanner at every counter where voice or catalogue search is sufficient. Barcode scanners can remain available for products that need exact barcode identification.

For larger retailers, the product could also connect to their existing catalogue and billing systems, apply the store’s GST settings, and support multiple counters or locations. These enterprise capabilities would need to be built and tested with each retailer; they are not included in the current demo.

## Why voice comes first

Shopkeepers and customers already speak while a sale is taking place. Product names, quantities, and simple changes such as removing an item are natural to say. Speaking can be quicker than typing on a small screen and lets the cashier keep their hands free to handle goods. A visible receipt keeps the cashier in control: they can review the items and total before saving.

## The current demo

The demo shows the basic billing flow with a sample catalogue and prices. It accepts a limited set of typed commands and can be used with separate dictation software such as Wispr Flow. It displays an editable receipt, supports confirmation before saving, and keeps saved bills in the browser on that device. The demo does not record audio, process payments, track stock, create legal GST invoices, or connect to enterprise systems.

GitHub Pages: https://rmdir-sys32.github.io/billboley/
