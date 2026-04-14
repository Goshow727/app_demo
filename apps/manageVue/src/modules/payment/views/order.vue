<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineOptions({
	name: "payment-order",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";

const { service } = useCool();
const { t } = useI18n();
const order = service.payment.order as any
const { fieldEq: options } = order.search;

const findOption = computed(() => {
	return (field: string) => {
		let option = options.find((item: any) => item.propertyName === field)
		let dict: any = [];
		try {
			for (const key in option.dict) {
				dict.push({
					label: t(option.dict[key]),
					value: Number(key),
				})
			}
		} catch (error) {
			dict = []
		}

		return dict;
	}
})
console.log(findOption.value("orderType"))
// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("订单号"),
			prop: "orderId",
			component: { name: "el-input", props: { clearable: true, disabled: "disabled" } },
			span: 24,
			required: true,
		},
		{
			label: t("订单名称"),
			prop: "orderName",
			component: { name: "el-input", props: { clearable: true, disabled: "disabled" } },
			span: 24,
			required: true,
		},
		{
			label: t("原价"),
			prop: "originalPrice",
			span: 24,
			component: { name: "el-input", props: { clearable: true, type: "number", disabled: "disabled" } },
			required: true,
		},
		{
			label: t("订单金额"),
			prop: "orderAmount",
			span: 24,
			component: { name: "el-input", props: { clearable: true, type: "number", disabled: "disabled" } },
			required: true,
		},
		{
			label: t("支付金额"),
			prop: "payAmount",
			span: 24,
			component: { name: "el-input", props: { clearable: true, type: "number", disabled: "disabled" } },
			required: true,
		},
		{
			label: t("状态"),
			prop: "orderStatus",
			component: { name: "el-radio-group", props: { disabled: "disabled" }, options: findOption.value("orderStatus") },
			dict: findOption.value("orderStatus"),
			required: true,
		},
		{
			label: t("订单类型"),
			prop: "orderType",
			component: { name: "el-radio-group", props: { disabled: "disabled" }, options: findOption.value("orderType") },
			value: 1,
			required: true,
		},
		{
			label: t("支付类型"),
			prop: "paymentType",
			component: { name: "el-radio-group", props: { disabled: "disabled" }, options: findOption.value("paymentType") },
			value: 1,
			required: true,
		},
		{
			label: t("支付渠道"),
			prop: "payChannel",
			component: { name: "el-radio-group", props: { disabled: "disabled" }, options: findOption.value("payChannel") },
			value: 1,
			required: true,
		},
		{
			label: t("用户ID"),
			prop: "userId",
			component: { name: "el-input", props: { clearable: true, disabled: "disabled" } },
			span: 24,
			required: true,
		},
		{
			label: t("用户昵称"),
			prop: "userName",
			component: { name: "el-input", props: { clearable: true, disabled: "disabled" } },
			span: 24,
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			showOverflowTooltip: true,
			minWidth: 200,
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: t("订单号"),
			prop: "orderId",
			width: 120
		},

		{
			label: t("订单名称"),
			prop: "orderName",
			width: 120,
		},
		{
			label: t("订单金额"),
			prop: "orderAmount",
			width: 120,
		},
		{
			label: t("订单类型"),
			prop: "orderType",
			width: 120,
		},
		{
			label: t("支付金额"),
			prop: "payAmount",
			width: 120,
		},
		{
			label: t("赠送算力"),
			prop: "power",
			width: 120,
		},

		{
			label: t("赠送会员天数"),
			prop: "days",
			width: 120,
		},

		{
			label: t("订单状态"),
			prop: "orderStatus",
			width: 120,
		},
		{
			label: t("支付时间"),
			prop: "payTime",
			width: 120,
		},
		{
			label: t("订单用户"),
			prop: "userId",
			width: 120,
		},
		{
			label: t("订单用户手机"),
			prop: "userPhone",
			width: 120,
		},
		{
			label: t("用户昵称"),
			prop: "userName",
			width: 120,
		},
		{
			label: t("订单支付时间"),
			prop: "payTime",
			width: 120,
		},

		{
			label: t("订单退款时间"),
			prop: "refundTime",
			width: 120,
		},
		{
			label: t("退款操作人"),
			prop: "refundUsername",
			width: 120,
		},

		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.payment.order,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
