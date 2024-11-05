<script lang="ts">
	import { Header, Footer, Content, Card, Form, Text, Button } from '$lib';
</script>

<Header content="Baggage Overweight Calculator" alignment="center" fontSize="small" />
<Content>
	<Card>
		<Form>
			<Text label="AIRLINE" placeholder="SELECT AIRLINE" />
			<Text label="DEPARTURE COUNTRY" placeholder="SELECT COUNTRY" />
			<Text label="DESTINATION COUNTRY" placeholder="SELECT COUNTRY" />
			<Text label="ALLOCATED WEIGHT (KG)" placeholder="ENTER WEIGHT" />
			<Text label="ACTUAL WEIGHT (KG)" placeholder="ENTER WEIGHT" />
			<Button />
			<Text label="BAGGAGE OVERWEIGHT FEE (USD)" placeholder="$0" />
		</Form>
	</Card>
</Content>
<Footer content="© 2024 Pathum Senanayake" alignment="center" fontSize="medium" />
