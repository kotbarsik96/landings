<template>
    <div class="payment-card">
        <InputWrapper class="payment-card__number">
            <template #label>Номер карты</template>
            <InputText name="payment" type="number" maxlength="12" placeholder="Номер карты"></InputText>
        </InputWrapper>
        <div class="payment-card__info">
            <InputWrapper class="payment-card__holder">
                <template #label>Владелец карты</template>
                <InputText name="payment" placeholder="Владелец карты"></InputText>
            </InputWrapper>
            <div class="payment-card__back">
                <InputWrapper class="payment-card__back-input">
                    <template #label>Срок действия</template>
                    <InputText name="payment" type="number" maxlength="5" placeholder="ММ/ГГ"></InputText>
                </InputWrapper>
                <InputWrapper class="payment-card__back-input">
                    <template #label>CVC</template>
                    <InputText name="payment" type="number" maxlength="3" placeholder="CVC"></InputText>
                </InputWrapper>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentBlock"
}
</script>